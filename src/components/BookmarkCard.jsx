import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

const BookmarkCard = ({video}) => {
  return (
    <TouchableOpacity
      style={tw`flex-row items-center bg-cyan-100 p-3 mb-2 rounded-lg shadow-md`}>
      <Image
        source={{uri: video.thumbnail}}
        style={tw`w-20 h-20 rounded-lg mr-3`}
        resizeMode="cover"
      />
      <View style={tw`flex-1`}>
        <Text style={tw`text-lg font-bold text-gray-800`} numberOfLines={2}>
          {video.title}
        </Text>
        <Text style={tw`text-sm text-gray-600 mt-1`} numberOfLines={1}>
          {video.category}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BookmarkCard;
