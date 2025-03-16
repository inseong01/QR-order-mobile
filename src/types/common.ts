import { SetStateAction } from 'react';
import { SharedValue } from 'react-native-reanimated';

type DevProductURL = 'https://qr-order-client.vercel.app/2';
type DevURL = 'http://192.168.0.29:3000/2';
export type WebViewURL = DevProductURL | DevURL;

export type SharedValues = {
  translateY: SharedValue<number>;
};

export type AnimatedType = 'IN' | 'OUT' | 'INIT';

export type HistoryState = {
  isGoBack: boolean;
  history: string[];
  setHistory: (value: SetStateAction<string[]>) => void;
};
