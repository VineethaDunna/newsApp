import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const LoadingCard = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade-in animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  });

  return (
    <LinearGradient
      colors={['#74EBD5', '#ACB6E5']} // Gradient Colors
      style={styles.container}>
      {/* Linear Gradient Background */}

      {/* Centered Image */}
      <Image
        source={{
          uri: 'https://www.bytestudios.com/content/blogs/byte-official.png',
        }}
        style={styles.image}
      />

      {/* Animated "Please Wait..." */}
      <Animated.Text style={[styles.text, {opacity: fadeAnim}]}>
        Please Wait...
      </Animated.Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  /* Main Container */
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Gradient Card */
  card: {
    width: width * 0.8,
    height: height * 0.4,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    padding: 20,
  },

  /* Centered Image */
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    zIndex: 2,
  },

  /* Animated Text */
  text: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'Poppins',
  },
});

export default LoadingCard;
