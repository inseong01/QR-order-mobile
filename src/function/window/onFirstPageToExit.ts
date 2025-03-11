import { RefObject, SetStateAction } from 'react';
import { Dimensions } from 'react-native';
import { withTiming, SharedValue } from 'react-native-reanimated';

const deviceHeight = Dimensions.get('window').height;

export function onFirstPageToExit({
  canExit,
  timemoutRef,
  opacity,
  translateY,
  setCanExit,
}: {
  canExit: boolean;
  timemoutRef: ReturnType<typeof setTimeout> | null;
  opacity: SharedValue<number>;
  translateY: SharedValue<number>;
  setCanExit: (value: SetStateAction<boolean>) => void;
}) {
  if (canExit) {
    console.log('종료됩니다.');
    // setTimeout 제거
    if (timemoutRef) clearTimeout(timemoutRef);
    // 플래시 메시지 퇴장 애니메이션 즉시 적용
    opacity.set((prev) => (prev = withTiming(0, { duration: 250 })));
    translateY.set((prev) => (prev = withTiming(deviceHeight - 100, { duration: 250 })));
    // 시스템 기본 뒤로가기 기능 적용
    return false;
  } else {
    // 앱 종료 시도 여부
    setCanExit(true);
    // 플래시 메시지 등장 애니메이션
    opacity.set((prev) => (prev = withTiming(1, { duration: 250 })));
    translateY.set((prev) => (prev = withTiming(deviceHeight - 110, { duration: 250 })));
    // 앱 종료 시도 제한 시간
    timemoutRef = setTimeout(() => {
      console.log('setTimeout', timemoutRef);
      setCanExit(false);
      // 플래시 메시지 퇴장 애니메이션
      opacity.set((prev) => (prev = withTiming(0, { duration: 250 })));
      translateY.set((prev) => (prev = withTiming(deviceHeight - 100, { duration: 250 })));
    }, 1000);
  }

  // 시스템 뒤로가기 기본 기능 제한 (false)
  return true;
}
