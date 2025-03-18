import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Pressable, Text} from 'react-native';

import Start from './screens/Start';
import Interests1 from './screens/Interests1';
import NewsPage from './screens/NewsPage';
import TrendingTopics from './screens/TrendingTopics';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'midnightblue',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <Pressable onPress={() => alert('Menu button pressed!')}>
              <Text style={{color: 'white', fontSize: 16, marginRight: 10}}>
                Menu
              </Text>
            </Pressable>
          ),
        }}>
        <Stack.Screen
          name="Start"
          component={Start}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Interests1" component={Interests1} />
        <Stack.Screen name="newspage" component={NewsPage} />
        <Stack.Screen
          name="TrendingTopics"
          component={TrendingTopics}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
