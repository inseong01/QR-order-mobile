import { useRef, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { router, Stack } from 'expo-router';

export default function Index() {
  const webviewRef = useRef<WebView>(null);
  const [url, getUrl] = useState('');

  function onMessage(e: WebViewMessageEvent) {
    console.log('Get Message!', e.nativeEvent.data);
  }

  // 강제 이동 (개발 임시 적용)
  function onLoadStart() {
    router.replace('/');
  }

  return (
    <View style={styles.container}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <WebView
        ref={webviewRef}
        source={{ uri: `http://192.168.0.13:3000/` }}
        onMessage={onMessage}
        // onLoadStart={onLoadStart}
        sharedCookiesEnabled={true}
        javaScriptEnabled={true}
      />
      <Button title="click" onPress={() => webviewRef.current?.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
