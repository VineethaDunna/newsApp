import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import tw from 'twrnc';

const Start = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 bg-cyan-100`}>
      {/* Background Overlay */}
      <View
        style={tw`absolute top-0 left-0 right-0 bottom-0  opacity-30`}
      />

      {/* Image */}
      <Image
        source={{
          uri: 'https://png.pngtree.com/png-clipart/20230419/original/pngtree-newspaper-cartoon-png-image_9066761.png',
        }}
        style={tw`flex-1`}
        resizeMode="contain"
      />

      {/* Bottom Content */}
      <View style={tw`pb-10 px-4`}>
        <Text style={tw`text-2xl font-bold text-center shadow-lg`}>
          Hello, Welcome to Bytes! 🚀
        </Text>

        {/* Navigation Button */}
        <TouchableOpacity
          style={tw`mt-5 px-6 py-3 bg-sky-500 rounded-lg shadow-lg self-center`}
          onPress={() => navigation.navigate('interests1')}>
          <Text style={tw`text-white text-lg font-bold`}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Start;
