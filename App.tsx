import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {StatusBar} from 'react-native';

// Screens Import
import Start from './src/screens/Start';
import Interests1 from './src/screens/Interests1';
import Interests2 from './src/screens/Interests2';
import NewsScreen from './src/screens/NewsScreen';
import SearchScreen from './src/screens/SearchScreen';
import VideoScreen from './src/screens/VideoScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import TrendingScreen from './src/screens/TrendingScreen';
import Bookmark from './src/screens/Bookmark';

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
          <Stack.Screen name="interests1" component={Interests1} />
          <Stack.Screen name="interests2" component={Interests2} />
          <Stack.Screen name="trendScreen" component={TrendingScreen} />
          <Stack.Screen name="newsScreen" component={NewsScreen} />
          <Stack.Screen name="videoScreen" component={VideoScreen} />
          <Stack.Screen name="search" component={SearchScreen} />
          <Stack.Screen name="profile" component={ProfileScreen} />
          <Stack.Screen name="bookmark" component={Bookmark} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
