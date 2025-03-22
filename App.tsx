import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {StatusBar} from 'react-native';

// Screens Import
import Start from './screens/Start';
import Interests1 from './screens/Interests1';
import TrendingTopics from './screens/TrendingTopics';
import Interests2 from './screens/Interests2';
import NewsScreen from './screens/NewsScreen';
import SearchScreen from './screens/SearchScreen';
import VideoScreen from './screens/VideoScreen';
import ProfileScreen from './screens/ProfileScreen';

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
          <Stack.Screen name="trendTopics" component={TrendingTopics} />
          <Stack.Screen name="newsScreen" component={NewsScreen} />
          <Stack.Screen name="videoScreen" component={VideoScreen} />
          <Stack.Screen name="search" component={SearchScreen} />
          <Stack.Screen name="profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
