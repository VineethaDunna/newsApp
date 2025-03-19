import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import tw from 'twrnc';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faSearch,
  faVideo,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

const Footer = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const navigation = useNavigation();

  const handleTabPress = tab => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  return (
    <View
      style={tw`flex-row justify-around items-center bg-black rounded-lg shadow-lg py-5`}>
      {/* Home Icon */}
      <TouchableOpacity
        onPress={() => handleTabPress('newsScreen')}
        style={tw`flex items-center`}>
        <FontAwesomeIcon
          icon={faHome}
          size={24}
          color={activeTab === 'Home' ? 'white' : 'gray'}
        />
        {/* <Text
          style={tw`${
            activeTab === 'Home' ? 'text-blue-500' : 'text-gray-500'
          } text-xs`}>
          Home
        </Text> */}
      </TouchableOpacity>

      {/* Search Icon */}
      <TouchableOpacity
        onPress={() => handleTabPress('Search')}
        style={tw`flex items-center`}>
        <FontAwesomeIcon
          icon={faSearch}
          size={24}
          color={activeTab === 'Search' ? 'white' : 'gray'}
        />
        {/* <Text
          style={tw`${
            activeTab === 'Search' ? 'text-blue-500' : 'text-gray-500'
          } text-xs`}>
          Search
        </Text> */}
      </TouchableOpacity>

      {/* Videos Icon */}
      <TouchableOpacity
        onPress={() => handleTabPress('trendTopics')}
        style={tw`flex items-center`}>
        <FontAwesomeIcon
          icon={faVideo}
          size={24}
          color={activeTab === 'Videos' ? 'white' : 'gray'}
        />
        {/* <Text
          style={tw`${
            activeTab === 'Videos' ? 'text-blue-500' : 'text-gray-500'
          } text-xs`}>
          Videos
        </Text> */}
      </TouchableOpacity>

      {/* Profile Icon */}
      <TouchableOpacity
        onPress={() => handleTabPress('Profile')}
        style={tw`flex items-center`}>
        <FontAwesomeIcon
          icon={faUser}
          size={24}
          color={activeTab === 'Profile' ? 'white' : 'gray'}
        />
        {/* <Text
          style={tw`${
            activeTab === 'Profile' ? 'text-blue-500' : 'text-gray-500'
          } text-xs`}>
          Profile
        </Text> */}
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
