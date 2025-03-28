import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {StatusBar} from 'react-native';

// Screens Import
import Start from './src/screens/Start';
import InterestScreen from './src/screens/InterestScreen';
import NewsScreen from './src/screens/NewsScreen';
import SearchScreen from './src/screens/SearchScreen';
import VideoScreen from './src/screens/VideoScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import TrendingScreen from './src/screens/TrendingScreen';
import BookmarkScreen from './src/screens/BookmarkScreen';
import LoginScreen from './src/screens/LoginScreen';
import LoginOtpScreen from './src/screens/LoginOtpScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      {/* Status Bar */}
      <StatusBar
        backgroundColor="#1E90FF" // Background color
        barStyle="dark-content" // Text and icon color
        translucent={false} // Prevents transparency
      />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start"
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.ModalFadeTransition,
          }}>
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="interest" component={InterestScreen} />
          <Stack.Screen name="trend" component={TrendingScreen} />
          <Stack.Screen name="newsScreen" component={NewsScreen} />
          <Stack.Screen name="videoScreen" component={VideoScreen} />
          <Stack.Screen name="search" component={SearchScreen} />
          <Stack.Screen name="profile" component={ProfileScreen} />
          <Stack.Screen name="loginScreen" component={LoginScreen} />
          <Stack.Screen name="LoginOtp" component={LoginOtpScreen} />
          <Stack.Screen name="bookmark" component={BookmarkScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
