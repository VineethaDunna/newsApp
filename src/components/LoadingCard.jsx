import React, {useEffect, useRef} from 'react';
import {View, Animated, Easing, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const LoadingCard = () => {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.5,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    pulse.start();

    return () => pulse.stop();
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.loader, {transform: [{scale: scaleAnim}]}]}
      />
    </View>
  );
};

export default LoadingCard;

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: width * 0.2,
    height: width * 0.2,
    backgroundColor: '#007BFF', // Blue color
    borderRadius: width * 0.1,
    shadowColor: '#007BFF',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
};
