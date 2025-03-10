import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Link, Stack, useNavigation, useRouter } from 'expo-router';
import CookieManager from '@react-native-cookies/cookies';
import { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';

import { githubConnect } from '@/src/function/link/githubConnect';
import { notFoundConnect } from '@/src/function/link/notFoundConnect';
import { mainPageConnect } from '@/src/function/link/mainPageConnect';
import { WebViewURL } from '@/src/types/common';

export default function Index() {
  // variant
  const nodeEnv = process.env.NODE_ENV;
  const webViewURI: WebViewURL =
    nodeEnv === 'development' ? process.env.EXPO_PUBLIC_DEV_URL : process.env.EXPO_PUBLIC_PRODUCTION_URL;
  // expo
  const router = useRouter();
  const navigation = useNavigation();
  // useRef
  const webviewRef = useRef<WebView>(null);
  // useState
  const [uri, setURI] = useState(`${webViewURI}/2`);

  useEffect(() => {
    CookieManager.clearAll();
  }, []);

  function onMessage(event: WebViewMessageEvent) {
    console.log(event.nativeEvent.data);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <WebView
        ref={webviewRef}
        source={{ uri }}
        sharedCookiesEnabled={true}
        javaScriptEnabled={true}
        onNavigationStateChange={async (state) => {
          const url = state.url;
          const { table } = await CookieManager.get(webViewURI);
          console.log('table', table.value);
          if (url.startsWith(`${webViewURI}/${table.value}/call`)) {
            console.log('???');
            // 페이지 넘어가는 현상 없앰
            webviewRef.current?.stopLoading();
            // 페이지 화면 이전 링크와 동기화
            webviewRef.current?.goBack();
            router.push('/call');
            // navigation.navigate('call', { url });
          }
          // GitHub 접속
          githubConnect({ url, webviewRef });
          // NotFound 접속
          notFoundConnect({ url, webViewURI });
          // 본 페이지 접속
          mainPageConnect({ url, webViewURI });
          console.log(url);
        }}
        onMessage={onMessage}
      />
      <Link href={'/call'}>next</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
