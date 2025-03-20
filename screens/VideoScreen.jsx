import React, {useState} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import tw from 'twrnc';
import VideoCard from '../components/VideoCard';
import Footer from '../components/Footer';
import {useNavigation} from '@react-navigation/native';

const {height} = Dimensions.get('window');

const videos = [
  {
    id: '1',
    title: 'The last ride of Vijay and Ajith Kumar',
    source: 'NDTV',
    time: 'few hours ago',
    thumbnail:
      'https://imagesvs.oneindia.com/img/2024/09/laapataa-ladies-small-1727078676.jpg',
  },
  {
    id: '2',
    title: 'Lapata Ladies Behind the Scenes',
    source: 'BBC',
    time: '2 days ago',
    thumbnail:
      'https://imagesvs.oneindia.com/img/2024/09/laapataa-ladies-small-1727078676.jpg',
  },
  {
    id: '3',
    title: 'India Chess Olympiad Historic Win',
    source: 'Times Now',
    time: '1 day ago',
    thumbnail:
      'https://imagesvs.oneindia.com/img/2024/09/laapataa-ladies-small-1727078676.jpg',
  },
  {
    id: '4',
    title: 'Badlapur Accused Encounter Full Story',
    source: 'CNN',
    time: '3 hours ago',
    thumbnail:
      'https://imagesvs.oneindia.com/img/2024/09/laapataa-ladies-small-1727078676.jpg',
  },
];

const VideoScreen = () => {
  const navigation = useNavigation();
  const [footerVisible, setFooterVisible] = useState(true);

  const handleTap = () => {
    setFooterVisible(false);
    setTimeout(() => setFooterVisible(true), 3000); // Auto-show footer after 2 seconds
  };

  const handleVideoPress = () => {
    navigation.navigate('SomeOtherScreen'); // Navigate properly
  };

  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      <View style={tw`flex-1 bg-cyan-100 bg-opacity-50 `}>
        {/* FlatList for Full-Screen Snap Scrolling */}
        <FlatList
          data={videos}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <VideoCard video={item} onPress={handleVideoPress} />
          )}
          pagingEnabled
          snapToAlignment="start"
          snapToInterval={height} // Full card per screen
          decelerationRate="fast"
        />

        {/* Footer with Auto-Hide */}
        {footerVisible && <Footer />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VideoScreen;
