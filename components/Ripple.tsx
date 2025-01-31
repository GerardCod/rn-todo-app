import { View, StyleProp, ViewStyle } from 'react-native';
import React, { ReactElement } from 'react';
import Animated, { measure, useAnimatedRef, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

interface RippleProps {
  style?: StyleProp<ViewStyle>;
  className?: string;
  children?: ReactElement | ReactElement[];
  backgroundColor?: string;
  disabled?: boolean;
}

const Ripple: React.FC<RippleProps> = ({style, className, children, backgroundColor, disabled = false}) => {
  const scale = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const boxRef = useAnimatedRef();
  const boxWidth = useSharedValue(0);
  const boxHeight = useSharedValue(0);
  const opacity = useSharedValue(0);

  const tap = Gesture
                .Tap()
                .maxDuration(200)
                .onStart((event) => {
                  if (disabled) return;

                  translateX.value = event.x;
                  translateY.value = event.y;
                  scale.value = 0;
                  scale.value = withTiming(1, { duration: 850 });
                  opacity.value = 0.3;
                })
                .onFinalize(() => {
                  if (disabled) return;

                  opacity.value = withTiming(0, { duration: 850 })
                });

  const animatedCircle = useAnimatedStyle(() => {
    const boxLayout = measure(boxRef);

    if (boxLayout) {
      boxWidth.value = boxLayout.width;
      boxHeight.value = boxLayout.height;
    }

    const radius = Math.sqrt(boxWidth.value ** 2 + boxHeight.value ** 2);
    const width = radius * 2;
    const height = radius * 2;

    return {
      width,
      height,
      borderRadius: radius,
      backgroundColor,
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: opacity.value,
      transform: [
        { translateX: translateX.value - radius },
        { translateY: translateY.value - radius },
        { scale: scale.value }
      ]
    };
  });

  return (
    <GestureDetector gesture={tap}>
      <Animated.View ref={boxRef} className={className} style={style}>
        <Animated.View style={animatedCircle} />
        { children }
      </Animated.View>
    </GestureDetector>
  )
}

export default Ripple;