import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Animated,
  FlatList,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';

const interests = [
  'Automobile',
  'Business',
  'Miscellaneous',
  'National',
  'Politics',
  'Science',
  'Fitness',
  'Health',
  'Lifestyle',
  'Food',
  'Movies',
  'Music',
];

const Interests2 = ({navigation}) => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const scaleAnims = useRef(
    interests.reduce((acc, item) => {
      acc[item] = new Animated.Value(1);
      return acc;
    }, {}),
  ).current;

  const toggleSelection = item => {
    const isSelected = selectedInterests.includes(item);
    setSelectedInterests(prev =>
      isSelected ? prev.filter(i => i !== item) : [...prev, item],
    );

    // Smooth animation
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
    <View style={styles.container}>
      {/* Title Section */}
      <Text style={styles.title}>Please Select Your Interest</Text>

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
              selectedInterests.includes(item) && styles.noShadow,
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
        {/* Skip Button */}
        <TouchableOpacity onPress={() => navigation.navigate('newsScreen')}>
          <Text style={styles.skipLink}>Skip</Text>
        </TouchableOpacity>

        {/* Next Button with Conditional Styling */}
        <TouchableOpacity
          onPress={() => {
            if (selectedInterests.length > 0) {
              navigation.navigate('newsScreen');
            }
          }}
          disabled={selectedInterests.length === 0}
          style={[
            styles.nextBtn,
            {
              backgroundColor:
                selectedInterests.length === 0 ? 'gray' : 'black',
            },
          ]}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  /* Main Container */
  container: {
    flex: 1,
    backgroundColor: '#c9f2ff',
    paddingHorizontal: 16,
    paddingVertical: 32,
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
  },

  /* FlatList Container */
  flatListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  /* Outer Shadow Wrapper */
  shadowWrapper: {
    borderRadius: 40,
    margin: 10,
    shadowColor: '#9e9e9e', // Gray shadow
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  /* Remove shadow when selected */
  noShadow: {
    shadowColor: 'transparent',
    elevation: 0,
  },

  /* Interest Button */
  interestBtn: {
    width: 160,
    height: 50,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Selected State */
  selected: {
    backgroundColor: '#4a4a4a', // Dark gray fill for selected items
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  skipLink: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#2c2c2c',
    textDecorationLine: 'underline',
  },

  nextBtn: {
    width: 156,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },

  nextText: {
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: 16,
  },
});

export default Interests2;
