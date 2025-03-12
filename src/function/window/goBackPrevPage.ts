import { RefObject } from 'react';
import WebView from 'react-native-webview';

export function goBackPrevPage({ webviewRef }: { webviewRef: RefObject<WebView> }) {
  webviewRef.current?.goBack();

  return true;
}
