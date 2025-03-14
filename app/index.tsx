import { Stack } from 'expo-router';
import { WebView } from 'react-native-webview';
import { useEffect, useRef, useState } from 'react';
import CookieManager from '@react-native-cookies/cookies';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { BackHandler, StyleSheet, Text, View } from 'react-native';

import { WebViewURL } from '@/src/types/common';
import { githubConnect } from '@/src/function/link/githubConnect';
import { notFoundConnect } from '@/src/function/link/notFoundConnect';
import { mainPageConnect } from '@/src/function/link/mainPageConnect';
import { setHistoryStack } from '@/src/function/window/setHistoryStack';
import { goBackPrevPage } from '@/src/function/window/goBackPrevPage';
import { flashMsgAnimate } from '@/src/function/window/flashMsgAnimate';

export default function Index() {
  // variant
  const webViewURI: WebViewURL = process.env.EXPO_PUBLIC_DEV_URL;
  // reanimated
  const translateY = useSharedValue(-28);
  // useRef
  const webviewRef = useRef<WebView>(null);
  const timemoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shutDownTimemoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const backBtnClickCount = useRef(0);
  const isImmediated = useRef(false);
  // useState
  const [uri, setURI] = useState(`${webViewURI}`);
  const [prevGoBackState, setPrevGoBackState] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [canExit, setCanExit] = useState(false);

  // 안드로이드 전용, 뒤로가기 기능 설정
  function hardwareBackPress() {
    const sharedValues = { translateY };
    backBtnClickCount.current += 1;

    // 강제 종료 시도
    if (backBtnClickCount.current === 1) {
      isImmediated.current = true;

      // 시도 제한 시간
      if (!shutDownTimemoutRef.current) {
        shutDownTimemoutRef.current = setTimeout(() => {
          isImmediated.current = false;
          backBtnClickCount.current = 0;
          shutDownTimemoutRef.current = null;
        }, 650);
      }
    }

    // 강제 종료
    if (isImmediated.current && backBtnClickCount.current >= 4) {
      // 설정 초기화
      flashMsgAnimate('INIT', { sharedValues });
      setCanExit(false);
      setHistory([]);
      isImmediated.current = false;
      backBtnClickCount.current = 0;
      shutDownTimemoutRef.current = null;
      return false;
    }

    // 이전 히스토리가 있을 때
    if (history.length > 1) {
      goBackPrevPage({ webviewRef });
      return true;
    }

    // 이전 히스토리가 없을 때
    // 앱 종료
    if (canExit) {
      if (timemoutRef.current) clearTimeout(timemoutRef.current);

      // 재접속, 설정 초기화
      flashMsgAnimate('INIT', { sharedValues });
      setCanExit(false);
      setHistory([]);

      return false;
    }

    // 앱 종료 시도
    setCanExit(true);
    flashMsgAnimate('IN', { sharedValues });

    // 앱 종료 시도 제한 시간
    timemoutRef.current = setTimeout(() => {
      setCanExit(false);
      flashMsgAnimate('OUT', { sharedValues });
    }, 1000);

    return true;
  }

  useEffect(() => {
    CookieManager.clearAll();
  }, []);

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
          const historyState = { isGoBack, history, setHistory };

          // GitHub 접속
          githubConnect({ url, webviewRef });
          // NotFound 접속
          notFoundConnect({ url, webViewURI });
          // 본 페이지 접속
          mainPageConnect({ url, webViewURI });
          // history 설정
          setHistoryStack({ url, historyState });

          // 이전 canGoBack 상태 보관
          setPrevGoBackState(currentGobackState);
        }}
      />
      <Animated.View style={[{ translateY }, styles.animatedBox, StyleSheet.absoluteFill]}>
        <Text style={styles.flashMsg}>한 번 더 누르면 종료됩니다.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedBox: {
    width: '100%',
    height: 28,
    display: 'flex',
    alignItems: 'center',
  },
  flashMsg: {
    width: '100%',
    height: 28,
    position: 'absolute',
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    lineHeight: 12,
    backgroundColor: '#4CAFF8',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
});
