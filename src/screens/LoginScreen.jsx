import React, {useState} from 'react'; // ✅ Import useState
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
  Modal, // ✅ Import Modal
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faGoogle,
  faApple,
  faFacebook,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import LoginOtpScreen from './LoginOtpScreen'; // ✅ Import OTP Screen

const {height} = Dimensions.get('window');

const LoginScreen = ({setIsOtpVisible, setIsLogin, onClose}) => {
  const navigation = useNavigation();

  // ✅ State for Modal visibility
  const handleGetOtp = () => {
    setIsOtpVisible(true); // ✅ Open OTP Modal
    onClose(); // ✅ Close Login Modal
  };

  // ✅ Open OTP Modal
  const handleOpenModal = () => {
    setIsOtpVisible(true);
  };

  // ✅ Navigate to OTP Screen
  const handleNavigateToOtp = () => {
    navigation.navigate('LoginOtp');
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.heading}>Let's Sign You In</Text>
        <Text style={styles.subHeading}>
          Access your personalized experience by entering your credentials.
        </Text>

        <TextInput placeholder="Full Name" style={styles.input} />
        <TextInput
          placeholder="+91 | Phone Number"
          style={styles.input}
          keyboardType="phone-pad"
        />

        {/* ✅ Button to open OTP modal */}
        <TouchableOpacity style={styles.otpButton} onPress={handleGetOtp}>
          <Text style={styles.otpButtonText}>Get OTP</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>OR</Text>

        <View style={styles.socialIcons}>
          <FontAwesomeIcon icon={faGoogle} size={32} color="#EA4335" />
          <FontAwesomeIcon icon={faApple} size={32} color="#000" />
          <FontAwesomeIcon icon={faFacebook} size={32} color="#4267B2" />
          <FontAwesomeIcon icon={faTwitter} size={32} color="#1DA1F2" />
        </View>

        <Pressable
          style={styles.closeButton}
          onPress={onClose} // ✅ Close Login Modal}
          android_ripple={{color: '#ddd'}}>
          <Text style={styles.closeText}>X</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.75,
  },
  heading: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 5,
  },
  subHeading: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  otpButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
  },
  otpButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 16,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  closeText: {
    fontSize: 20,
    color: '#555',
  },
});
