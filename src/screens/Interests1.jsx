import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const interests = [
  'Automobile',
  'Business',
  'Miscellaneous',
  'National',
  'Politics',
  'Science',
];

const Interest1 = ({navigation}) => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const scaleAnims = useRef(
    interests.reduce((acc, item) => {
      acc[item] = new Animated.Value(1); // Scale animation for each item
      return acc;
    }, {}),
  ).current;

  const toggleSelection = item => {
    const isSelected = selectedInterests.includes(item);
    setSelectedInterests(prev =>
      isSelected ? prev.filter(i => i !== item) : [...prev, item],
    );

    // Individual item animation (scale & fade)
    Animated.sequence([
      Animated.timing(scaleAnims[item], {
        toValue: 1.05,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[item], {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <LinearGradient colors={['white', '#c7f2ff']} style={styles.container}>
      <View style={styles.container}>
        {/* Title Section */}
        <View>
          <Text style={styles.title}>Please Select Your Interest</Text>
        </View>

        {/* FlatList Section */}
        <FlatList
          data={interests}
          keyExtractor={item => item}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({item}) => (
            <Animated.View
              style={[
                styles.shadowWrapper,
                selectedInterests.includes(item) && styles.noShadow, // Remove shadow when selected
                {transform: [{scale: scaleAnims[item]}]},
              ]}>
              <Pressable
                onPress={() => toggleSelection(item)}
                style={[
                  styles.interestBtn,
                  selectedInterests.includes(item) && styles.selected,
                ]}>
                <Text
                  style={[
                    styles.interestText,
                    selectedInterests.includes(item) && styles.textSelected,
                  ]}>
                  {item}
                </Text>
              </Pressable>
            </Animated.View>
          )}
        />

        {/* Footer Section */}
        <View style={styles.footer}>
          <Pressable onPress={() => navigation.navigate('newsScreen')}>
            <Text style={styles.skipLink}>Skip</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  /* Main Container */
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  /* Title Section */
  title: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
    color: '#2c2c2c',
    textAlign: 'center',
    marginBottom: 24,
    top: 60,
  },

  /* FlatList Wrapper */
  flatListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  /* Shadow Wrapper (outer shadow only) */
  shadowWrapper: {
    borderRadius: 40,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  /* Interest Button */
  interestBtn: {
    width: 156,
    height: 48,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 7,
  },

  /* Selected State */
  selected: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fill color when selected
    elevation: 0,
  },

  interestText: {
    fontFamily: 'Poppins',
    fontSize: 18,
    color: '#2c2c2c',
  },

  textSelected: {
    color: 'white',
  },

  /* Footer Section */
  footer: {
    marginBottom: 32,
  },

  skipLink: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#2c2c2c',
    textDecorationLine: 'underline',
  },
});

export default Interest1;
