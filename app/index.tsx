import { useEffect, useRef, useState } from 'react';
import { BackHandler, Dimensions, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Stack } from 'expo-router';
import CookieManager from '@react-native-cookies/cookies';
import Animated, { useSharedValue } from 'react-native-reanimated';

import { githubConnect } from '@/src/function/link/githubConnect';
import { notFoundConnect } from '@/src/function/link/notFoundConnect';
import { mainPageConnect } from '@/src/function/link/mainPageConnect';
import { WebViewURL } from '@/src/types/common';
import { setHistoryStack } from '@/src/function/window/setHistoryStack';
import { goBackPrevPage } from '@/src/function/window/goBackPrevPage';
import { onFirstPageToExit } from '@/src/function/window/onFirstPageToExit';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function Index() {
  // variant
  const nodeEnv = process.env.NODE_ENV;
  const webViewURI: WebViewURL =
    nodeEnv === 'development' ? process.env.EXPO_PUBLIC_DEV_URL : process.env.EXPO_PUBLIC_PRODUCTION_URL;
  // reanimated
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(deviceHeight - 100);
  // useRef
  const webviewRef = useRef<WebView>(null);
  const timemoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // useState
  const [uri, setURI] = useState(`${webViewURI}`);
  const [prevGoBackState, setPrevGoBackState] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [canExit, setCanExit] = useState(false);

  useEffect(() => {
    CookieManager.clearAll();
  }, []);

  // 안드로이드 전용, 뒤로가기 기능 설정
  function hardwareBackPress() {
    // 뒤로가기 시스템 기본 설정값
    let isExit = false;

    // 이전 히스토리가 있을 때
    isExit = goBackPrevPage({ history, webviewRef });

    // 이전 히스토리가 없을 때 (첫 화면)
    isExit = onFirstPageToExit({
      canExit,
      setCanExit,
      timemoutRef: timemoutRef.current,
      opacity,
      translateY,
    });

    return isExit;
  }

  // 뒤로가기 버튼 이벤트 설정
  useEffect(() => {
    // 안드로이드 전용
    const backHandler = BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => {
      backHandler.remove();
    };
  }, [history, canExit]);

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
          const currentGobackState = state.canGoBack;
          const isGoBack = prevGoBackState === true && currentGobackState === false;

          // GitHub 접속
          githubConnect({ url, webviewRef });
          // NotFound 접속
          notFoundConnect({ url, webViewURI });
          // 본 페이지 접속
          mainPageConnect({ url, webViewURI });
          // history 설정
          setHistoryStack({
            url,
            history,
            isGoBack,
            setHistory,
          });

          // 이전 canGoBack 여부 보관
          setPrevGoBackState(state.canGoBack);
        }}
      />
      <Animated.View style={[{ opacity }, { translateY }, styles.flashMsg, StyleSheet.absoluteFill]}>
        <Text>한 번 더 누르면 종료됩니다.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flashMsg: {
    width: 170,
    height: 20,
    position: 'absolute',
    transform: [{ translateX: deviceWidth / 2 - 85 }],
  },
});
