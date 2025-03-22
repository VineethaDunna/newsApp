import React, {useState, useEffect} from 'react';
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
import Footer from './Footer';

const {height, width} = Dimensions.get('window');

const NewsCard = ({item}) => {
  const [likes, setLikes] = useState(120);
  const [comments] = useState(699);
  const [shares] = useState(800);
  const [bookmarked, setBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const [isFullScreen, setIsFullScreen] = useState(false); // Full-screen mode
  const [lastTap, setLastTap] = useState(null); // Double tap detection
  const [footerVisible, setFooterVisible] = useState(true); // Footer visibility

  // Toggle Bookmark
  const toggleBookmark = () => setBookmarked(!bookmarked);

  // Like handler
  const handleLike = () => {
    setLikes(prev => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };

  // Double tap for full-screen mode
  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap && now - lastTap < 300) {
      setIsFullScreen(!isFullScreen);
    } else {
      setLastTap(now);
    }
  };

  // Show footer on tap and auto-hide after 3 seconds
  const handleToggleFooter = () => {
    setFooterVisible(true);

    // Auto-hide footer after 3 seconds
    setTimeout(() => {
      setFooterVisible(false);
    }, 2000);
  };

  useEffect(() => {
    // Auto-hide footer initially after 3 seconds
    const timer = setTimeout(() => {
      setFooterVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={handleToggleFooter}
      onLongPress={handleDoubleTap} // Double tap for full-screen mode
    >
      <View
        style={[
          tw`bg-cyan-100 bg-opacity-50 rounded-2xl justify-between`,
          {
            height: isFullScreen ? '100%' : height,
            width: isFullScreen ? '100%' : 'auto',
          },
        ]}>
        {/* Image Section */}

        <View style={tw`relative rounded-xl  `}>
          <TouchableWithoutFeedback onPress={handleDoubleTap}>
            <Image
              source={{uri: item.imageUrl}}
              style={[
                tw`rounded-[30px] top-[64px] left-[16px] right-[16px]`,
                {
                  width: isFullScreen ? '100%' : 378,
                  height: isFullScreen ? 900 : 300,
                },
              ]}
              resizeMode="cover"
            />
          </TouchableWithoutFeedback>

          {/* Top Left Tag */}
          {!isFullScreen && (
            <View
              style={tw`absolute top-[84px] left-[36px] w-[60px] h-[24px] bg-blue-500  rounded-[16px]`}>
              <Text style={tw`text-white font-bold`}>Bytes</Text>
            </View>
          )}

          {/* Bookmark Icon */}
          {!isFullScreen && (
            <TouchableOpacity
              onPress={toggleBookmark}
              style={tw`absolute top-10 right-10 bg-white px-3 py-1 rounded-lg shadow-md`}>
              <FontAwesomeIcon
                icon={faBookmark}
                size={20}
                color={bookmarked ? '#06b6ff' : 'gray'}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Content Section */}
        {!isFullScreen && (
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
                {item.source} | {item.publishedDate}
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
        )}

        {/* Footer Section */}
        {!footerVisible && !isFullScreen && (
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

        {footerVisible && !isFullScreen && <Footer />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NewsCard;
