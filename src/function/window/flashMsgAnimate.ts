import { Easing, withTiming } from 'react-native-reanimated';

import { AnimatedType, SharedValues } from '@/src/types/common';

export function flashMsgAnimate(animatedType: AnimatedType, { sharedValues }: { sharedValues: SharedValues }) {
  const { translateY } = sharedValues;

  switch (animatedType) {
    case 'IN': {
      translateY.set((prev) => (prev = withTiming(0, { duration: 500, easing: Easing.bezier(0.25, 0.1, 0.25, 1) })));

      break;
    }
    case 'OUT': {
      translateY.set((prev) => (prev = withTiming(-28, { duration: 500, easing: Easing.bezier(0.25, 0.1, 0.25, 1) })));

      break;
    }
    case 'INIT': {
      translateY.set((prev) => (prev = withTiming(-28, { duration: 0 })));

      break;
    }
  }
}
