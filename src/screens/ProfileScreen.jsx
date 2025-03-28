import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Dimensions,
  Modal,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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
  faArrowTrendUp,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native'; // ✅ Import navigation hook
import LoginScreen from './LoginScreen'; // ✅ Import the LoginScreen

import Footer from '../components/Footer';
import LoginOtpScreen from './LoginOtpScreen';

const {width, height} = Dimensions.get('window');

const ProfileScreen = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const [isHDMedia, setIsHDMedia] = useState(true);
  const navigation = useNavigation();

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
  const handleOpenLogin = () => {
    setIsLoginVisible(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false); // Reset login state
    setIsLoginVisible(false); // Hide login modal
    setIsOtpVisible(false); // Hide OTP modal
  };

  const handleCloseLogin = () => {
    setIsLoginVisible(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  return (
    <View style={tw`flex-1 bg-white pt-10`}>
      <ScrollView>
        {/* Profile Section */}
        <LinearGradient
          colors={['white', '#c7f2ff']}
          style={styles.gradientBackground}>
          <View style={styles.profileSection}>
            <View style={styles.imageWrapper}>
              <Image
                source={{
                  uri: isLoggedIn
                    ? 'https://i.pinimg.com/736x/a2/b3/a2/a2b3a2ce88f2ee0a451ad6c35060cba8.jpg'
                    : 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
                }}
                style={[styles.profileImage, {opacity: isLoggedIn ? 1 : 0.5}]}
                resizeMode="cover"
              />
              {!isLoggedIn && (
                <TouchableOpacity style={styles.cameraIcon}>
                  <FontAwesomeIcon icon={faCamera} size={22} color="#333" />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {isLoggedIn ? 'Vishal Juneja' : 'Guest User'}
              </Text>
              <TouchableOpacity
                onPress={isLoggedIn ? handleLogout : handleOpenLogin}
                style={[
                  styles.authButton,
                  isLoggedIn ? styles.logoutButton : styles.loginButton,
                ]}>
                <Text
                  style={[
                    styles.authButton,
                    isLoggedIn
                      ? styles.authButtonLogoutText
                      : styles.authButtonLoginText,
                  ]}>
                  {isLoggedIn ? 'Logout' : 'Login'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Options Section */}
          <View
            style={[
              tw`p-6 rounded-t-3xl`,
              {height: height * 0.8}, // Set height to 80% of the screen height
            ]}>
            {/* My Bookmarks */}
            <Pressable
              style={tw`flex-row items-center mb-5`}
              onPress={() => navigation.navigate('bookmark')} // ✅ Navigate to Bookmark screen
            >
              <View style={styles.iconWrapper}>
                <FontAwesomeIcon icon={faBookmark} size={22} color="#01bef9" />
              </View>
              <Text style={tw`ml-4 text-lg text-gray-800`}>My Bookmark</Text>
            </Pressable>

            {/* Language with Dropdown */}
            <TouchableOpacity
              style={tw`flex-row  items-center justify-between mb-5`}
              onPress={toggleDropdown}>
              <View style={tw`flex-row items-center`}>
                <View style={styles.iconWrapper}>
                  <FontAwesomeIcon icon={faGlobe} size={24} color="#01bef9" />
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
            <Modal
              visible={showDropdown}
              transparent={true}
              animationType="fade">
              <TouchableOpacity
                style={tw`flex-1 absolute top-38%  right-2`}
                onPress={() => setShowDropdown(false)}>
                <View style={tw`bg-[#c1f0ff] p-4 rounded-3xl z-[-3] w-[100%] `}>
                  <ScrollView style={{maxHeight: 200}}>
                    {languages.map((lang, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setSelectedLanguage(lang.name);
                          setShowDropdown(false);
                        }}
                        style={tw`p-3 border-b ${
                          selectedLanguage === lang.name ? '#01bef9' : ''
                        }`}>
                        <Text>{lang.native}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </TouchableOpacity>
            </Modal>

            {/* My Bookmarks */}
            <Pressable
              style={tw`flex-row items-center mb-5`}
              onPress={() => navigation.navigate('trend')} // ✅ Navigate to Bookmark screen
            >
              <View style={styles.iconWrapper}>
                <FontAwesomeIcon
                  icon={faArrowTrendUp}
                  size={24}
                  color="#01bef9"
                />
              </View>
              <Text style={tw`ml-4 text-lg text-gray-800`}>
                Trending Topics
              </Text>
            </Pressable>

            {/* Interests */}
            <Pressable
              style={tw`flex-row items-center mb-5`}
              onPress={() => navigation.navigate('interest')}>
              <View style={styles.iconWrapper}>
                <FontAwesomeIcon icon={faHeart} size={24} color="#01bef9" />
              </View>
              <Text style={tw`ml-4 text-lg text-gray-800`}>Interests</Text>
            </Pressable>

            {/* Night Mode */}
            <TouchableOpacity
              onPress={() => setIsNightMode(!isNightMode)}
              style={tw`flex-row justify-between items-center mb-5`}>
              <View style={tw`flex-row items-center`}>
                <View style={styles.iconWrapper}>
                  <FontAwesomeIcon icon={faMoon} size={24} color="#01bef9" />
                </View>
                <Text style={tw`ml-4 text-gray-800 text-lg`}>Night Mode</Text>
              </View>
              {/* Toggle Button */}
              <TouchableOpacity
                onPress={() => setIsNightMode(!isNightMode)}
                style={[
                  tw`w-14 h-7 rounded-full`,
                  isNightMode ? tw`bg-green-500` : tw`bg-red-400`,
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
                <View style={styles.iconWrapper}>
                  <FontAwesomeIcon icon={faTv} size={24} color="#01bef9" />
                </View>
                <Text style={tw`ml-4 text-gray-800 text-lg`}>HD Media</Text>
              </View>

              {/* Toggle Button */}
              <TouchableOpacity
                onPress={() => setIsHDMedia(!isHDMedia)}
                style={[
                  tw`w-14 h-7 rounded-full`,
                  isHDMedia ? tw`bg-green-500` : tw`bg-red-400`,
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
        </LinearGradient>
      </ScrollView>

      <Footer />
      {/* Login Modal */}
      <Modal visible={isLoginVisible} animationType="slide" transparent={true}>
        <LoginScreen
          setIsOtpVisible={setIsOtpVisible} // ✅ Pass OTP state handler
          setIsLogin={setIsLoggedIn} // ✅ Pass login handler
          onClose={handleCloseLogin}
        />
      </Modal>

      {/* OTP Modal */}
      <Modal visible={isOtpVisible} animationType="slide" transparent={true}>
        <LoginOtpScreen
          setIsOtpVisible={setIsOtpVisible} // ✅ Pass OTP handler
          setIsLogin={setIsLoggedIn} // ✅ Set logged in state on OTP success
        />
      </Modal>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileSection: {
    paddingVertical: 15,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    height: '20%',
  },
  imageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 104,
    height: 104,
    borderRadius: 60,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#ccc',
    padding: 8,
    borderRadius: 20,
  },
  userInfo: {
    paddingLeft: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 400,
    fontFamily: 'Poppins',
    left: 16,
  },
  authButton: {
    marginTop: 10,
    width: 135,
    height: 48,
    borderRadius: 16,
  },
  loginButton: {
    backgroundColor: 'black',
    left: 16,
  },
  logoutButton: {
    backgroundColor: 'rgb(254, 217, 212)',
    borderRadius: 16,
    left: 16,
  },
  authButtonLogoutText: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  authButtonLoginText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconWrapper: {
    backgroundColor: '#c1f0ff',
    padding: 12,
    marginTop: 12,
    borderRadius: 8,
    width: 40,
    height: 40,

    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: 16,
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '500',
    alignItems: 'center',
    color: '#444',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalBackground: {
    width: '100%',
    padding: 20,
    height: '100%',
    borderRadius: 16,
  },
});
