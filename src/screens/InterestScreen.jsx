import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {height} = Dimensions.get('window');

const allInterests = [
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
  'Technology',
];

const InterestScreen = ({navigation}) => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [visibleInterests, setVisibleInterests] = useState(
    allInterests.slice(0, 6),
  );

  // Fade-in animation controller
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Scale animation for individual items
  const scaleAnims = useRef(
    allInterests.reduce((acc, item) => {
      acc[item] = new Animated.Value(1);
      return acc;
    }, {}),
  ).current;

  // Function to smoothly reveal new interests with fade animation
  const revealInterests = newInterests => {
    setVisibleInterests(newInterests);

    // Trigger fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500, // Smooth transition duration
      useNativeDriver: true,
    }).start();
  };

  const toggleSelection = item => {
    const isSelected = selectedInterests.includes(item);

    // Update selected interests
    const updatedSelected = isSelected
      ? selectedInterests.filter(i => i !== item)
      : [...selectedInterests, item];

    setSelectedInterests(updatedSelected);

    // Reveal more interests dynamically with fade effect
    if (updatedSelected.length === 2 && visibleInterests.length < 10) {
      revealInterests(allInterests.slice(0, 10)); // Add 4 more
    } else if (updatedSelected.length === 5 && visibleInterests.length < 13) {
      revealInterests(allInterests.slice(0, 13)); // Add 3 more
    }

    // Individual button animation
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

  // Initialize fade animation on component mount
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  });

  return (
    <View style={styles.container}>
      {/* Title Section */}
      <Text style={styles.title}>Please Select Your Interests</Text>

      {/* Interests Section */}
      <View>
        <Animated.View style={{opacity: fadeAnim}}>
          <FlatList
            data={visibleInterests}
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
        </Animated.View>
      </View>
      {/* Footer Section */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('newsScreen')}>
          <Text style={styles.skipLink}>Skip</Text>
        </TouchableOpacity>

        {selectedInterests.length > 0 && (
          <TouchableOpacity
            onPress={() => navigation.navigate('newsScreen')}
            style={styles.nextBtn}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  /* Main Container */
  container: {
    flex: 1,
    backgroundColor: '#c9f2ff',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  /* Title Section */
  title: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 28,
    color: '#2c2c2c',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 10,
  },

  /* Interests Container */
  interestsContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  /* FlatList Container */
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },

  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  /* Shadow Wrapper */
  shadowWrapper: {
    borderRadius: 40,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  noShadow: {
    shadowColor: 'transparent',
    elevation: 0,
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
    backgroundColor: '#4a4a4a',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
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
    backgroundColor: '#000',
  },

  nextText: {
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: 16,
  },
});

export default InterestScreen;
