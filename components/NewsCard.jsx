import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import tw from 'twrnc';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHeart,
  faComment,
  faShare,
  faBookmark,
  faVolumeUp,
} from '@fortawesome/free-solid-svg-icons';

const {height} = Dimensions.get('window');

const NewsCard = ({item, globalFooterVisible, toggleFooter}) => {
  const [likes, setLikes] = useState(120);
  const [comments] = useState(699);
  const [shares] = useState(800);
  const [bookmarked, setBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const toggleBookmark = () => setBookmarked(!bookmarked);

  const handleLike = () => {
    setLikes(prev => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };

  return (
    <TouchableWithoutFeedback onPress={toggleFooter}>
      <View
        style={[
          tw`bg-cyan-100 bg-opacity-50 rounded-2xl pt-10 justify-between n`,
          {height},
        ]}>
        {/* Image Section */}
        <View>
          <View style={tw`relative  p-4`}>
            <Image
              source={{uri: item.image}}
              style={tw`w-full h-100 rounded-xl`}
              resizeMode="cover"
            />

            {/* Top Left Tag */}
            <View
              style={tw`absolute top-10 left-10 bg-blue-500 px-3 py-1 rounded-lg`}>
              <Text style={tw`text-white text-md font-bold`}>Bytes</Text>
            </View>

            {/* Bookmark Icon */}
            <TouchableOpacity
              onPress={toggleBookmark}
              style={tw`absolute top-10 right-10 bg-white px-3 py-1 rounded-lg shadow-md`}>
              <FontAwesomeIcon
                icon={faBookmark}
                size={20}
                color={bookmarked ? '#06b6ff' : 'gray'}
              />
            </TouchableOpacity>
          </View>

          {/* Content Section */}
          <View style={tw`p-5`}>
            <Text style={tw`text-2xl font-bold text-gray-900`}>
              {item.title}
            </Text>
            <Text style={tw`text-gray-600 text-sm mt-3`}>
              {item.description}
            </Text>

            {/* Source & Date */}
            <View style={tw`flex-row justify-between items-center mt-4`}>
              <Text style={tw`text-gray-700 text-sm font-semibold`}>
                {item.source} | {item.date}
              </Text>

              {/* Sound and Share Icons */}
              <View style={tw`flex-row gap-3`}>
                <TouchableOpacity
                  style={tw`bg-white border border-gray-300 p-2 rounded-md shadow-sm`}>
                  <FontAwesomeIcon
                    icon={faVolumeUp}
                    size={22}
                    color="#06b6ff"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={tw`bg-white border border-gray-300 p-2 rounded-md shadow-sm`}>
                  <FontAwesomeIcon icon={faShare} size={22} color="#06b6ff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* Footer Section */}
        {!globalFooterVisible && (
          <View style={tw`flex items-center mb-10`}>
            {/* Swipe Up Text */}
            <Text style={tw`text-gray-500 text-sm mb-2`}>
              ↑ Swipe up to read more
            </Text>

            {/* Stats Footer */}
            <View
              style={tw`flex-row items-center justify-around bg-gray-700 px-3 py-3 rounded-full w-9/12 shadow-lg`}>
              {/* Likes */}
              <TouchableOpacity
                style={tw`flex-row items-center`}
                onPress={handleLike}>
                <FontAwesomeIcon
                  icon={faHeart}
                  size={18}
                  color={isLiked ? 'red' : 'white'}
                />
                <Text style={tw`text-white text-base ml-2`}>
                  {likes >= 1000 ? `${(likes / 1000).toFixed(1)}k` : likes}
                </Text>
              </TouchableOpacity>

              {/* Comments */}
              <TouchableOpacity style={tw`flex-row items-center`}>
                <FontAwesomeIcon icon={faComment} size={18} color="white" />
                <Text style={tw`text-white text-base ml-2`}>{comments}</Text>
              </TouchableOpacity>

              {/* Shares */}
              <TouchableOpacity style={tw`flex-row items-center`}>
                <FontAwesomeIcon icon={faShare} size={18} color="white" />
                <Text style={tw`text-white text-base ml-2`}>{shares}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NewsCard;
