import { CoffeeSize, DeliOption, LatLng, PaymentMethod } from '@/types';

export const APP_NAME = "Coffee Shop";

export const GOOGLE_OAUTH_CLIENT_ID = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;

export const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export const defaultCoordinate: LatLng = {
  lng: 73.7898,
  lat: 19.9975,
};

export const defaultDeliFee = 2000;

export const coffeeSizeOptions = [
  {
    value: CoffeeSize.SMALL,
    label: 'Regular',
  },
  
];

export const deliOptions = [
  {
    value: DeliOption.DELIVER,
    label: 'Deliver',
  },
  {
    value: DeliOption.PICK_UP,
    label: 'Pick Up',
  },
];

export const paymentMethodOptions = [
  {
    value: PaymentMethod.CASH,
    label: "Cash on Delivery",
    icon: '/images/cash-payment-icon.png',
  },
  {
    value: PaymentMethod.KBZ_PAY,
    label: "UPI Pay",
    icon: '/images/wave-money-icon.png',
  },
  {
    value: PaymentMethod.WAVE_MONEY,
    label: "Google Pay",
    icon: '/images/kbz-pay-icon.png',
  },
];
