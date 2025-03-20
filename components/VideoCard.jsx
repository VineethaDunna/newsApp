import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import tw from 'twrnc';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faShare, faVolumeUp} from '@fortawesome/free-solid-svg-icons';

const {height, width} = Dimensions.get('window');

const VideoCard = ({video, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[tw`flex justify-center  items-center`, {height, width}]}>
      <View
        style={[
          tw`rounded-2xl overflow-hidden  shadow-lg`,
          {width: width * 0.9, height: height * 0.83}, // Add margin around card
        ]}>
        {/* Full-Screen Thumbnail */}
        <ImageBackground
          source={{uri: video.thumbnail}}
          style={tw`w-full h-full`}
          resizeMode="cover">
          {/* Floating Icons - Positioned to Bottom Right */}
          <View style={tw`absolute top-5 right-5 z-3 gap-4`}>
            <TouchableOpacity style={tw`items-center`}>
              <FontAwesomeIcon icon={faShare} size={28} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={tw`items-center`}>
              <FontAwesomeIcon icon={faVolumeUp} size={28} color="white" />
            </TouchableOpacity>
          </View>

          {/* Content Overlay */}
          <View
            style={tw`flex-1 justify-end items-start bg-black bg-opacity-50 p-6`}>
            {/* Title */}
            <Text style={tw`text-white text-3xl font-bold mb-4`}>
              {video.title}
            </Text>

            {/* Source & Time */}
            <Text style={tw`text-gray-300 text-base pb-5`}>
              By {video.source}, {video.time}
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default VideoCard;
