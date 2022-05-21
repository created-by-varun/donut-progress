import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import DonutProgress from 'donut-progress';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  return (
    <View style={styles.container}>
      <DonutProgress appendText="%" fontSize={30} radius={100} strokeWidth={10} duration={1500} percentage={86} max={100} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
