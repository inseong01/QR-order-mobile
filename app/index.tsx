import { SafeAreaView, Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Index() {
  return (
    <SafeAreaView>
      <Text>dd</Text>
      <WebView source={{ uri: '192.168.0.0:192' }} />
    </SafeAreaView>
  );
}
