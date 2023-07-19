import { Animated } from "react-native";


export const toggleFinding = (dynamicBackgroundColor) => {
    Animated.spring(
        dynamicBackgroundColor,
        {
          toValue: 1, useNativeDriver: true,
          speed: 1,
          bounciness: 100,
        }
      ).start();
};

export const toggleFound = (dynamicBackgroundColor, callbackAfter) => {
    Animated.spring(
        dynamicBackgroundColor,
        {
          toValue: 0, useNativeDriver: true,
          speed: 1,
          bounciness: 100,
        }
      ).start(callbackAfter);
};