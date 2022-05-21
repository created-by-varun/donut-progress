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
  appendText?: string;
  edgeCurved?: boolean;
  fraction?: boolean;
  secondaryColor?:string
  barColor?:string
};

const DonutProgress = ({
  percentage = 75,
  radius = 40,
  strokeWidth = 10,
  duration = 500,
  color = "#3A50CF",
  delay = 500,
  textColor,
  max = 100,
  fontSize = radius / 2,
  fontWeight = '500',
  bgStrokeOpacity = '0.1',
  rotation = 0,
  appendText = '',
  edgeCurved = false,
  fraction = false,
  secondaryColor = color,
  barColor = color,
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
          text: `${Math.round(v.value)} ${appendText}`,
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
            style={{ fontSize: fontSize * 1.2, color: textColor ?? color, fontWeight: fontWeight, textAlign: 'center', top: -15 }}
          />
          <Text style={{ fontSize: fontSize * 1.5, fontWeight: fontWeight, textAlign: 'center', top: 0,color:barColor }}>/</Text>
          <Text style={{ fontSize: fontSize * 1.2, fontWeight: fontWeight, textAlign: 'center', top: 15,color:secondaryColor }}>
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
