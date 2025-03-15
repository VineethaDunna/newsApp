// import React from 'react';
// import {ScrollView, View, Dimensions} from 'react-native';

// import Interest1 from './screens/Interests1';
// import NewsPage from './screens/NewsPage';
// import Start from './screens/Start';

// const {height} = Dimensions.get('window');

// const App = () => {
//   return (
//     <ScrollView
//       pagingEnabled // Enables smooth full-screen scrolling
//       showsVerticalScrollIndicator={false} // Hides the scroll bar
//     >
//       <View style={{minHeight: height}}>
//         <Start />
//       </View>
//       <View style={{minHeight: height}}>
//         <Interest1 />
//       </View>
//       <View style={{minHeight: height}}>
//         <NewsPage />
//       </View>
//     </ScrollView>
//   );
// };

// export default App;

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Start from './screens/Start';
import Interests1 from './screens/Interests1';

const Stack = createNativeStackNavigator();
enableScreens();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Interest1" component={Interests1} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
