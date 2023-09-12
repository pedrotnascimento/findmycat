import { Animated } from "react-native";


export const firstCircleIteration = (dynamicCircle) => {
    Animated.timing(
        dynamicCircle,
        {
            toValue: 1,
            useNativeDriver: true,
            duration: 3000,
        }
    ).start();
};

export const circleClose = (dynamicCircle) => {
    Animated.timing(
        dynamicCircle,
        {
            toValue: 0,
            useNativeDriver: true,
            duration: 1,
        }
    ).start(() => {
        circleExpand(dynamicCircle);

    });
};

const circleExpand = (dynamicCircle) => {
    Animated.timing(
        dynamicCircle,
        {
            toValue: 1,
            useNativeDriver: true,
            duration: 3000,
        }
    ).start();
}

export const endCircleRoutine = (dynamicCircle, circleAnimationInterval )=>{
    Animated.timing(
        dynamicCircle,
        {
          toValue: 0,
          useNativeDriver: true,
          duration: 0,
        }
      ).start(() => {
        
        clearInterval(circleAnimationInterval);
      });
}