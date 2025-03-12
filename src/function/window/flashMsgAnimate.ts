import { withTiming } from 'react-native-reanimated';

import { AnimatedType, SharedValues } from '@/src/types/common';

export function flashMsgAnimate(animatedType: AnimatedType, { sharedValues }: { sharedValues: SharedValues }) {
  const { opacity, translateY, deviceHeight } = sharedValues;

  switch (animatedType) {
    case 'IN': {
      opacity.set((prev) => (prev = withTiming(1, { duration: 250 })));
      translateY.set((prev) => (prev = withTiming(deviceHeight - 110, { duration: 250 })));

      break;
    }
    case 'OUT': {
      opacity.set((prev) => (prev = withTiming(0, { duration: 250 })));
      translateY.set((prev) => (prev = withTiming(deviceHeight - 100, { duration: 250 })));

      break;
    }
    case 'INIT': {
      opacity.set((prev) => (prev = withTiming(0, { duration: 0 })));
      translateY.set((prev) => (prev = withTiming(deviceHeight - 100, { duration: 0 })));

      break;
    }
  }
}
