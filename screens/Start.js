import React from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import tw from 'twrnc';

const Start = () => {
  return (
    <ImageBackground
      source={{
        uri: 'https://png.pngtree.com/png-clipart/20230419/original/pngtree-newspaper-cartoon-png-image_9066761.png',
      }}
      style={tw`flex-1 justify-end`} // Ensure image takes full height, but content stays at the bottom
      resizeMode="contain">
      {/* Dark Overlay for better text readability */}
      <View
        style={tw`absolute top-0 left-0 right-0 bottom-0 bg-white opacity-30`}
      />

      {/* Bottom Content (Text & Button) */}
      <View style={tw`pb-10 px-4`}>
        <Text style={tw`text-2xl font-bold  text-center shadow-lg`}>
          Hello, Welcome to Today's News! 🚀
        </Text>

        {/* Get Started Button */}
        <TouchableOpacity
          style={tw`mt-5 px-6 py-3 bg-blue-500 rounded-lg shadow-lg self-center`}>
          <Text style={tw`text-white text-lg font-semibold`}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Start;
