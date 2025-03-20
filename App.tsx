import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';

import Start from './screens/Start';
import Interests1 from './screens/Interests1';
import TrendingTopics from './screens/TrendingTopics';
import Interests2 from './screens/Interests2';
import NewsScreen from './screens/NewsScreen';
import SearchScreen from './screens/SearchScreen';
import VideoScreen from './screens/VideoScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar
        backgroundColor="#1E90FF" // Background color
        barStyle="dark-content" // Text and icon color (light or dark)
        translucent={false} // Prevents transparency
      />

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen
            name="Start"
            component={Start}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="interests1"
            component={Interests1}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="interests2"
            component={Interests2}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="trendTopics"
            component={TrendingTopics}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="newsScreen"
            component={NewsScreen}
            options={{headerShown: false}} // Initially hidden
          />

          <Stack.Screen
            name="videoScreen"
            component={VideoScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="search"
            component={SearchScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="profile"
            component={ProfileScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
