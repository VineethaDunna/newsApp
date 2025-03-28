import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faSearch,
  faVideo,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

const Footer = () => {
  const [activeTab, setActiveTab] = useState('newsScreen'); // ✅ Default screen
  const navigation = useNavigation();

  const handleTabPress = (tab, screenName) => {
    setActiveTab(tab);
    navigation.navigate(screenName); // ✅ Navigate to the selected screen
  };

  return (
    <View style={styles.navContainer}>
      <View style={styles.navbar}>
        {/* Home */}
        <TouchableOpacity onPress={() => handleTabPress('Home', 'newsScreen')}>
          <FontAwesomeIcon
            icon={faHome}
            size={28}
            color={activeTab === 'Home' ? '#1E90FF' : 'gray'}
          />
        </TouchableOpacity>

        {/* Search */}
        <TouchableOpacity onPress={() => handleTabPress('Search', 'search')}>
          <FontAwesomeIcon
            icon={faSearch}
            size={28}
            color={activeTab === 'Search' ? '#1E90FF' : 'gray'}
          />
        </TouchableOpacity>

        {/* Videos */}
        <TouchableOpacity
          onPress={() => handleTabPress('Video', 'videoScreen')}>
          <FontAwesomeIcon
            icon={faVideo}
            size={28}
            color={activeTab === 'Video' ? '#1E90FF' : 'gray'}
          />
        </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity onPress={() => handleTabPress('Profile', 'profile')}>
          <FontAwesomeIcon
            icon={faUser}
            size={28}
            color={activeTab === 'Profile' ? '#1E90FF' : 'gray'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  navContainer: {
    width: '100%',
    height: 70,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10, // Shadow effect for better visibility
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingVertical:20,
  },
});
