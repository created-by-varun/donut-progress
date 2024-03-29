import React, { useEffect } from 'react';
import { Easing, TextInput, Animated, View, StyleSheet, Text } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface IProps {
  percentage?: number;
  radius?: number;
  strokeWidth?: number;
  duration?: number;
  color?: string;
  delay?: number;
  textColor?: string;
  max?: number;
  fontSize?: number;
  fontWeight?: any;
  bgStrokeOpacity?: string;
  rotation?: number;
  prependText?: string;
  appendText?: string;
  edgeCurved?: boolean;
  fraction?: boolean;
  secondaryColor?: string
  barColor?: string
};

const DonutProgress = ({
  percentage = 75,
  max = 100,
  radius = 40,
  strokeWidth = 10,
  duration = 500,
  delay = 500,
  color = "#3A50CF",
  textColor = color,
  fontSize = radius / 2,
  fontWeight = '500',
  bgStrokeOpacity = '0.2',
  rotation = 0,
  prependText='',
  appendText = '',
  edgeCurved = true,
  fraction = false,
  secondaryColor = textColor,
  barColor = textColor,
}: IProps) => {

  const animated = React.useRef(new Animated.Value(0)).current;
  const circleRef = React.useRef<any>();
  const inputRef = React.useRef<any>();
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  const animation = (toValue: number) => {
    return Animated.timing(animated, {
      delay: delay,
      toValue,
      duration,
      useNativeDriver: false,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  useEffect(() => {
    animation(percentage);
    animated.addListener((v) => {
      const maxPerc = 100 * v.value / max;
      const strokeDashoffset = circumference - (circumference * maxPerc) / 100;
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${prependText} ${Math.round(v.value)} ${appendText}`,
        });
      }
      if (circleRef?.current) {
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });

    return () => {
      animated.removeAllListeners();
    };
  }, [max, percentage]);

  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        {/* @ts-ignore */}
        <G rotation={-90 + rotation} origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            ref={circleRef}
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap={edgeCurved ? 'round' : 'butt'}
            strokeDashoffset={circumference}
            strokeDasharray={circumference}
          />
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeOpacity={bgStrokeOpacity}
          />
        </G>
      </Svg>
      {fraction ? (
        <View style={[StyleSheet.absoluteFillObject, { flexDirection: "row", alignItems: "center", justifyContent: "center" }]}>
          <AnimatedTextInput
            ref={inputRef}
            underlineColorAndroid="transparent"
            editable={false}
            defaultValue="0"
            style={{ fontSize: fontSize, color: textColor ?? color, fontWeight: fontWeight, textAlign: 'center', top: "-6%" }}
          />
          <Text style={{ fontSize: fontSize, fontWeight: fontWeight, textAlign: 'center', color: barColor }}>/</Text>
          <Text style={{ fontSize: fontSize, fontWeight: fontWeight, textAlign: 'center', top: "9%", color: secondaryColor }}>
            {max}
          </Text>
        </View>
      ) : (
        <AnimatedTextInput
          ref={inputRef}
          underlineColorAndroid="transparent"
          editable={false}
          defaultValue="0"
          style={
            [
              StyleSheet.absoluteFillObject,
              { fontSize: fontSize, color: textColor ?? color, fontWeight: fontWeight, textAlign: 'center' },
            ]
          }
        />
      )}
    </View>
  );
}

export default DonutProgress;
