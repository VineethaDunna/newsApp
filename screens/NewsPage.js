import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
// import {AntDesign, MaterialIcons, Ionicons} from '@expo/vector-icons'; // Expo icons
import tw from 'twrnc';

const NewsPage = () => {
  return (
    <View style={tw`flex-1 bg-gray-200 p-4`}>
      {/* News Card */}
      <View style={tw`bg-white mt-10 mb-10 rounded-xl p-4 shadow-lg`}>
        {/* Image Section */}
        <View style={tw`relative`}>
          <View style={tw`flex items-center justify-center`}>
            <Image
              source={{
                uri: 'https://i.pinimg.com/736x/de/5f/f6/de5ff6977451e2a7ab418ae6b8856a02.jpg',
              }}
              style={tw`w-full h-80 rounded-lg`}
              resizeMode="cover"
            />
          </View>
          {/* Label Badge */}
          <View
            style={tw`absolute top-2 left-2 bg-blue-500 px-2 py-1 rounded-full`}>
            <Text style={tw`text-white text-xs font-semibold`}>Bytes</Text>
          </View>
          {/* Bookmark Icon */}
          <TouchableOpacity
            style={tw`absolute top-2 right-2 bg-white p-2 rounded-full`}>
            {/* <Ionicons name="bookmark-outline" size={24} color="black" /> */}
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={tw`text-lg font-bold text-gray-900 mt-3`}>
          The last ride of Vijay and Ajith Kumar: What would the twinless twin
          do?
        </Text>

        {/* Description */}
        <Text style={tw`text-gray-600 text-sm mt-2`}>
          There is something called twinless twin syndrome. It has been explored
          in films like KV Anand-Suriya’s Maattrraan and RS Durai Senthilkumar’s
          Dhanush-starrer Kodi...
        </Text>

        {/* Footer Section */}
        <Text style={tw`text-gray-500 text-xs mt-2`}>
          By NDTV, few hours ago
        </Text>

        {/* Action Buttons */}
        <View style={tw`flex-row justify-end mt-3`}>
          <TouchableOpacity style={tw`mr-3 bg-blue-100 p-2 rounded-full`}>
            {/* <AntDesign name="sharealt" size={20} color="blue" /> */}
          </TouchableOpacity>
          <TouchableOpacity style={tw`bg-blue-100 p-2 rounded-full`}>
            {/* <MaterialIcons name="volume-up" size={20} color="blue" /> */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NewsPage;
