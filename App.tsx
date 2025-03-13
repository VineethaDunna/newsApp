import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

const App = () => {
  return (
    <View style={tw`flex-1 bg-gray-100 justify-center items-center px-4`}>
      <Text style={tw`text-2xl font-bold text-blue-600 text-center`}>
        Hello, Welcome to Today's News! 🚀
      </Text>

      <TouchableOpacity style={tw`mt-5 px-6 py-3 bg-blue-500 rounded-lg`}>
        <Text style={tw`text-white text-lg font-semibold`}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
