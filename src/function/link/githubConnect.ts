import * as Linking from 'expo-linking';
import { RefObject } from 'react';
import WebView from 'react-native-webview';

export function githubConnect({ url, webviewRef }: { url: string; webviewRef: RefObject<WebView> }) {
  if (url.startsWith('https://github.com')) {
    // 페이지 넘어가는 현상 없앰
    webviewRef.current?.stopLoading();
    // 페이지 화면 이전 링크와 동기화
    webviewRef.current?.goBack();
    // 외부 링크로 연결
    Linking.openURL(url);
  }
}
