import { Link, Stack } from 'expo-router';
import { useRef } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

export default function NotFoundScreen() {
  const webviewRef = useRef<WebView>(null);

  function onMessage(e: WebViewMessageEvent) {
    console.log('Get Message!', e.nativeEvent.data);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen name="index" options={{ title: 'Not found...' }} />
      <WebView
        ref={webviewRef}
        source={{ uri: `http://192.168.0.13:3000/0/not-found` }}
        onMessage={onMessage}
        sharedCookiesEnabled={true}
        javaScriptEnabled={true}
      />
      <Link href="/">go back</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
