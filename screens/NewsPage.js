import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

const NewsCard = () => {
  return (
    <View style={tw`flex-1 bg-gray-100`}>
      {/* Full-Screen Card */}
      <View
        style={tw`flex-1 bg-white rounded-2xl justify-between shadow-lg overflow-hidden`}>
        {/* Image Section */}
        <Image
          source={{
            uri: 'https://i.pinimg.com/736x/de/5f/f6/de5ff6977451e2a7ab418ae6b8856a02.jpg',
          }}
          style={tw`w-full h-1/2`} // Half of the screen height
          resizeMode="cover"
        />

        {/* Content Section */}
        <View style={tw`p-5 flex-1 justify-between`}>
          <View>
            <View style={tw`flex-row justify-between items-center mb-3`}>
              <Text style={tw`text-blue-500 text-sm font-semibold`}>Bytes</Text>
              <Text style={tw`text-gray-400 text-xs`}>Few hours ago</Text>
            </View>

            <Text style={tw`text-2xl font-bold text-gray-900`}>
              The Last Ride of Vijay and Ajith Kumar: What Would the Twinless
              Twin Do?
            </Text>

            <Text style={tw`text-gray-600 text-sm mt-3 leading-6`}>
              Twinless twin syndrome has been explored in films like KV
              Anand-Suriya’s Maattrraan and RS Durai Senthilkumar’s
              Dhanush-starrer Kodi. The concept explores the emotional impact of
              losing a twin.
            </Text>
          </View>

          {/* Footer Section */}
          <View style={tw`flex-row justify-between items-center mt-5`}>
            <Text style={tw`text-gray-500 text-xs`}>By NDTV</Text>
            <View style={tw`flex-row`}>
              <TouchableOpacity style={tw`bg-blue-100 p-2 rounded-full mx-1`}>
                <Text style={tw`text-blue-500 text-sm`}>🔗 Share</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`bg-blue-100 p-2 rounded-full mx-1`}>
                <Text style={tw`text-blue-500 text-sm`}>🔊 Listen</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NewsCard;
