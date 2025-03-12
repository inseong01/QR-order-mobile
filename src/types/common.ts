import { SetStateAction } from 'react';
import { SharedValue } from 'react-native-reanimated';

type ProductURL = 'https://qr-order-client.vercel.app';
type DevURL = 'http://192.168.0.29:3000/2';
export type WebViewURL = ProductURL | DevURL;

export type SharedValues = {
  opacity: SharedValue<number>;
  translateY: SharedValue<number>;
  deviceHeight: number;
};

export type AnimatedType = 'IN' | 'OUT' | 'INIT';

export type HistoryState = {
  isGoBack: boolean;
  history: string[];
  setHistory: (value: SetStateAction<string[]>) => void;
};
