import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Stack } from 'expo-router';
import CookieManager from '@react-native-cookies/cookies';

import { githubConnect } from '@/src/function/link/githubConnect';
import { notFoundConnect } from '@/src/function/link/notFoundConnect';
import { mainPageConnect } from '@/src/function/link/mainPageConnect';
import { productURL } from '@/src/types/common';

export default function Index() {
  const productURL: productURL = 'http://192.168.0.13:3000';
  const webviewRef = useRef<WebView>(null);
  const [uri, setURI] = useState(`${productURL}/2`);

  useEffect(() => {
    CookieManager.clearAll();
  }, []);

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
          // GitHub 접속
          githubConnect({ url, webviewRef });
          // NotFound 접속
          notFoundConnect({ url, productURL });
          // 본 페이지 접속
          mainPageConnect({ url, productURL });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
