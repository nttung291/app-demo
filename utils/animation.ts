import { useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

// This is a polyfill for useAnimatedNumber which might be expected by some Tamagui components
// It uses useSharedValue which is the standard way to create animated values in Reanimated 3.x
export const useAnimatedNumber = (initialValue: number) => {
  return useSharedValue(initialValue);
};

// Export other animation utilities that might be needed
export { useSharedValue, withSpring, withTiming };
