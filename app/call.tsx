import { Stack, useNavigationContainerRef, usePathname } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import * as Linking from 'expo-linking';
import WebView from 'react-native-webview';
import { useEffect } from 'react';

export default function Call() {
  const ref = useNavigationContainerRef();
  const pathName = usePathname(); // /call
  const url = Linking.getLinkingURL()?.split('url=')[1];
  console.log('pathName', pathName, url);

  useEffect(() => {
    // const url = getURL();
    console.log('');
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen name="index" options={{ title: 'call' }} />
      {/* <WebView
        source={{ uri: 's' }}
        sharedCookiesEnabled={true}
        javaScriptEnabled={true}
        onNavigationStateChange={async (state) => {}}
      /> */}
      <Text>call</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
