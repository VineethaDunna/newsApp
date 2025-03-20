import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Modal,
  StatusBar,
} from 'react-native';
import tw from 'twrnc';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCaretDown,
  faCamera,
  faBookmark,
  faHeart,
  faMoon,
  faTv,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';

const {width, height} = Dimensions.get('window');

const ProfileScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState('');
  const [isNightMode, setIsNightMode] = useState(false);
  const [isHDMedia, setIsHDMedia] = useState(true);

  const languages = [
    {name: 'English', native: 'English'},
    {name: 'Spanish', native: 'Español'},
    {name: 'French', native: 'Français'},
    {name: 'German', native: 'Deutsch'},
    {name: 'Hindi', native: 'हिन्दी'},
    {name: 'Chinese', native: '中文'},
    {name: 'Japanese', native: '日本語'},
    {name: 'Russian', native: 'Русский'},
    {name: 'Italian', native: 'Italiano'},
    {name: 'Portuguese', native: 'Português'},
    {name: 'Korean', native: '한국어'},
    {name: 'Arabic', native: 'العربية'},
    {name: 'Bengali', native: 'বাংলা'},
    {name: 'Turkish', native: 'Türkçe'},
    {name: 'Dutch', native: 'Nederlands'},
  ];

  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  return (
    <View style={tw`flex-1 bg-cyan-100 pt-10`}>
      {/* Dynamic Status Bar */}
      <StatusBar
        barStyle={isLoggedIn ? 'dark-content' : 'light-content'}
        backgroundColor={isLoggedIn ? '#ffffff' : '#00bcd4'}
      />

      <ScrollView>
        {/* Profile Section */}
        <View style={tw`bg-white  pt-5 pb-15 px-6 flex-row items-center`}>
          <View style={tw`relative`}>
            <Image
              source={{
                uri: 'https://i.pinimg.com/736x/a2/b3/a2/a2b3a2ce88f2ee0a451ad6c35060cba8.jpg',
              }}
              style={[
                tw`w-30 h-30 rounded-full`,
                {opacity: isLoggedIn ? 1 : 0.5},
              ]}
              resizeMode="cover"
            />

            {!isLoggedIn && (
              <TouchableOpacity
                style={tw`absolute bottom-3 right-3 bg-gray-200 p-2 rounded-full shadow-md`}>
                <FontAwesomeIcon icon={faCamera} size={22} color="#333" />
              </TouchableOpacity>
            )}
          </View>

          <View style={tw`pl-3`}>
            <Text style={tw`text-2xl font-bold mt-5`}>
              {isLoggedIn ? 'Vishal Juneja' : 'Guest User'}
            </Text>

            <TouchableOpacity
              onPress={isLoggedIn ? handleLogout : handleLogin}
              style={tw`mt-5 px-5 py-3 rounded-full ${
                isLoggedIn ? 'bg-red-100' : 'bg-green-100'
              }`}>
              <Text style={tw`text-red-500 text-center font-bold`}>
                {isLoggedIn ? 'Logout' : 'Login'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Options Section */}
        <View style={tw`p-6 h-[100%] `}>
          {/* My Bookmarks */}
          <TouchableOpacity style={tw`flex-row items-center mb-5`}>
            <View
              style={tw`bg-white p-3 rounded-full shadow-md border border-gray-200`}>
              <FontAwesomeIcon icon={faBookmark} size={20} color="#4F46E5" />
            </View>
            <Text style={tw`ml-4 text-gray-800 text-lg`}>My Bookmark</Text>
          </TouchableOpacity>

          {/* Language with Dropdown */}
          <TouchableOpacity
            style={tw`flex-row  items-center justify-between mb-5`}
            onPress={toggleDropdown}>
            <View style={tw`flex-row items-center`}>
              <View
                style={tw`bg-white p-3 rounded-full shadow-md border border-gray-200`}>
                <FontAwesomeIcon icon={faGlobe} size={20} color="#10B981" />
              </View>
              <Text style={tw`ml-4 text-gray-800 text-lg`}>Language</Text>
            </View>
            <View style={tw`flex-row items-center gap-2`}>
              <Text style={tw`ml-4 text-gray-800 text-lg`}>
                {selectedLanguage}
              </Text>

              <FontAwesomeIcon
                icon={faCaretDown}
                size={20}
                color="#333"
                style={tw`${showDropdown ? 'rotate-180' : ''}`}
              />
            </View>
          </TouchableOpacity>

          {/* Language Modal Dropdown */}
          <Modal visible={showDropdown} transparent={true} animationType="fade">
            <TouchableOpacity
              style={tw`flex-1 absolute top-38%  right-0`}
              onPress={() => setShowDropdown(false)}>
              <View style={tw`bg-white p-4 rounded-3xl shadow-lg w-[90%] `}>
                <TextInput
                  placeholder="Search Language"
                  value={search}
                  onChangeText={setSearch}
                  style={tw`border p-3 rounded-lg mb-3`}
                />

                <ScrollView style={{maxHeight: 300}}>
                  {filteredLanguages.map((lang, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectedLanguage(lang.name);
                        setShowDropdown(false);
                      }}
                      style={tw`p-3 border-b ${
                        selectedLanguage === lang.name ? 'bg-blue-100' : ''
                      }`}>
                      <Text>{lang.native}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </TouchableOpacity>
          </Modal>

          {/* Interests */}
          <TouchableOpacity style={tw`flex-row items-center mb-5`}>
            <View
              style={tw`bg-white p-3 rounded-full shadow-md border border-gray-200`}>
              <FontAwesomeIcon icon={faHeart} size={18} color="#F87171" />
            </View>
            <Text style={tw`ml-4 text-gray-800 text-lg`}>Interests</Text>
          </TouchableOpacity>

          {/* Night Mode */}
          <TouchableOpacity
            onPress={() => setIsNightMode(!isNightMode)}
            style={tw`flex-row justify-between items-center mb-5`}>
            <View style={tw`flex-row items-center`}>
              <View
                style={tw`bg-white p-3 rounded-full shadow-md border border-gray-200`}>
                <FontAwesomeIcon icon={faMoon} size={20} color="#10B981" />
              </View>
              <Text style={tw`ml-4 text-gray-800 text-lg`}>Night Mode</Text>
            </View>
            {/* Toggle Button */}
            <TouchableOpacity
              onPress={() => setIsNightMode(!isNightMode)}
              style={[
                tw`w-14 h-7 rounded-full`,
                isNightMode ? tw`bg-green-500` : tw`bg-gray-400`,
              ]}>
              <View
                style={[
                  tw`w-6 h-6 rounded-full bg-white m-0.5 transition-all`,
                  isNightMode ? tw`ml-7` : tw`ml-0.5`,
                ]}
              />
            </TouchableOpacity>
          </TouchableOpacity>

          {/* HD Media */}
          <TouchableOpacity
            onPress={() => setIsHDMedia(!isHDMedia)}
            style={tw`flex-row justify-between items-center`}>
            <View style={tw`flex-row items-center`}>
              <View
                style={tw`bg-white p-3 rounded-full shadow-md border border-gray-200`}>
                <FontAwesomeIcon icon={faTv} size={20} color="#10B981" />
              </View>
              <Text style={tw`ml-4 text-gray-800 text-lg`}>HD Media</Text>
            </View>

            {/* Toggle Button */}
            <TouchableOpacity
              onPress={() => setIsHDMedia(!isHDMedia)}
              style={[
                tw`w-14 h-7 rounded-full`,
                isHDMedia ? tw`bg-green-500` : tw`bg-gray-400`,
              ]}>
              <View
                style={[
                  tw`w-6 h-6 rounded-full bg-white m-0.5 transition-all`,
                  isHDMedia ? tw`ml-7` : tw`ml-0.5`,
                ]}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
};

export default ProfileScreen;
