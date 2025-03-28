import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const LoginOtpScreen = ({setIsOtpVisible, setIsLogin}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);
  const navigation = useNavigation();
  const [timer, setTimer] = useState(60);
  const [showPopup, setShowPopup] = useState(false);
  const popupOpacity = useRef(new Animated.Value(0)).current;

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.join('').length === 6) {
      console.log('OTP Verified:', otp.join(''));
      setIsOtpVisible(false); // ✅ Hide OTP modal
      setIsLogin(true); // ✅ Set logged in state
    } else {
      alert('Enter valid 6-digit OTP');
    }
  };

  const handleResend = () => {
    console.log('Resending OTP...');
    setTimer(60); // Reset timer
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.subtitle}>
          Enter 6 digit OTP sent to your number{' '}
          <Text style={styles.phoneNumber}>+91 98555 77756</Text>{' '}
          <Text style={styles.edit}>Edit</Text>
        </Text>

        {/* OTP Inputs */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={el => (inputs.current[index] = el)}
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={text => handleChange(text, index)}
            />
          ))}
        </View>

        {/* Timer and Resend */}
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>
            {timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer}` : '00:00'}
          </Text>
          {timer === 0 && (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resend}>Resend Code</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Verify OTP Button */}
        <TouchableOpacity onPress={handleVerify} style={styles.verifyButton}>
          <Text style={styles.verifyButtonText}>Verify OTP</Text>
        </TouchableOpacity>

        {/* Close Button */}
        <Pressable
          style={styles.closeButton}
          onPress={() => {
            setIsOtpVisible(false); // ✅ Hide OTP modal
            navigation.navigate('profile'); // ✅ Navigate to Profile
          }}
          android_ripple={{color: '#ddd'}}>
          <Text style={styles.closeText}>X</Text>
        </Pressable>

        {/* Success Popup */}
        {showPopup && (
          <Animated.View style={[styles.popup, {opacity: popupOpacity}]}>
            <Text style={styles.popupText}>✅ Verification Successful!</Text>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default LoginOtpScreen;

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
  popup: {
    position: 'absolute',
    top: 30,
    left: '30%',
    alignSelf: 'center',
    backgroundColor: '#4caf50', // Green popup
    padding: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  popupText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  phoneNumber: {
    fontWeight: 'bold',
  },
  edit: {
    color: '#01bef9',
    fontWeight: '500',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#f1f1f1',
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  timer: {
    fontSize: 14,
    color: '#555',
  },
  resend: {
    color: '#01bef9',
    fontSize: 14,
    fontWeight: 'bold',
  },
  verifyButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
