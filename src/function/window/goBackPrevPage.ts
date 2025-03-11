import { RefObject } from 'react';
import WebView from 'react-native-webview';

export function goBackPrevPage({
  history,
  webviewRef,
}: {
  history: string[];
  webviewRef: RefObject<WebView>;
}) {
  let result = false;
  if (history.length > 1) {
    console.log('back');
    webviewRef.current?.goBack();
    result = true;
  }
  return result;
}
