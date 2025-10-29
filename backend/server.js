require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const User = require('./models/user');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ MongoDB Connected');
  })
  .catch(err => {
    console.error('❌ MongoDB Error:', err);
    process.exit(1);
  });

// Google Login Endpoint - Modified to accept the user data directly
app.post('/api/auth/google', async (req, res) => {
  const { googleId, email, name, givenName, familyName, picture, locale, emailVerified } = req.body;

  try {
    // Validate required fields
    if (!googleId || !email || !name) {
      return res.status(400).json({
        success: false,
        message: 'Missing required user information'
      });
    }

    // Check if user exists
    let user = await User.findOne({ googleId });

    if (user) {
      // Update last login
      user.lastLogin = Date.now();
      await user.save();
      console.log('✅ Existing user logged in:', email);
    } else {
      // Create new user
      user = await User.create({
        googleId,
        email,
        name,
        givenName,
        familyName,
        picture,
        locale,
        emailVerified
      });
      console.log('✅ New user created:', email);
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        googleId: user.googleId,
        email: user.email,
        name: user.name,
        picture: user.picture
      }
    });

  } catch (error) {
    console.error('❌ Google Auth Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during authentication'
    });
  }
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-__v');
    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
