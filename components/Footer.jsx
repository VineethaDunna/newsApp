import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
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
      style={tw`flex-row justify-around items-center bg-black rounded-lg shadow-lg py-4 absolute bottom-0 left-0 right-0 z-10`}>
      {/* Home */}
      <TouchableOpacity onPress={() => handleTabPress('newsScreen')}>
        <FontAwesomeIcon
          icon={faHome}
          size={28}
          color={activeTab === 'Home' ? 'white' : 'gray'}
        />
      </TouchableOpacity>

      {/* Search */}
      <TouchableOpacity onPress={() => handleTabPress('search')}>
        <FontAwesomeIcon
          icon={faSearch}
          size={28}
          color={activeTab === 'search' ? 'white' : 'gray'}
        />
      </TouchableOpacity>

      {/* Videos */}
      <TouchableOpacity onPress={() => handleTabPress('videoScreen')}>
        <FontAwesomeIcon
          icon={faVideo}
          size={28}
          color={activeTab === 'videoScreen' ? 'white' : 'gray'}
        />
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity onPress={() => handleTabPress('profile')}>
        <FontAwesomeIcon
          icon={faUser}
          size={28}
          color={activeTab === 'trendTopics' ? 'white' : 'gray'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
