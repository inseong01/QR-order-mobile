import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Button, Dimensions, SafeAreaView, StyleSheet, Text } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
// const postMSG = () => postMessage('Hi');

export default function Index() {
  const [tableName, getTableName] = useState('');
  const webviewRef = useRef<WebView>(null);
  const route = '';

  function onMessage(e: WebViewMessageEvent) {
    console.log('Get Message!', e.nativeEvent.data);
    // router.navigate('http://192.168.0.13:3000/1/bill');
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webviewRef}
        style={styles.webview}
        source={{ uri: `http://192.168.0.13:3000/1` }}
        onMessage={onMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    width: deviceWidth,
    height: deviceHeight,
  },
});
