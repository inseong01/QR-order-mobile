import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Stack } from 'expo-router';
import { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';

import { WebViewURL } from '@/src/types/common';

export default function NotFound() {
  const webViewURI: WebViewURL = process.env.EXPO_PUBLIC_DEV_URL;
  const webviewRef = useRef<WebView>(null);
  const [uri, setURI] = useState(`${webViewURI}/0/not-found`);

  function onMessage(event: WebViewMessageEvent) {
    console.log(event.nativeEvent.data);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen name="+not-found" options={{ title: 'Not found' }} />
      <WebView
        ref={webviewRef}
        source={{ uri }}
        sharedCookiesEnabled={true}
        javaScriptEnabled={true}
        onMessage={onMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
