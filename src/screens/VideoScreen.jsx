import React, {useState, useEffect} from 'react';
import {View, Dimensions, ActivityIndicator, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import tw from 'twrnc';
import Footer from '../components/Footer';
import VideoCard from '../components/VideoCard';

const {height} = Dimensions.get('window');

const PEXELS_API_KEY =
  'W7QvTZNhcXq94mhsXYawXVWpyURCEO3Bc3GmYgPyMrbWq7Slz27TZvu1';
const API_URL = 'https://api.pexels.com/videos/search?query=nature&per_page=10';

const VideoScreen = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Videos from API
  const fetchVideos = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {Authorization: PEXELS_API_KEY},
      });

      const fetchedVideos = response.data.videos.map(video => ({
        id: video.id.toString(),
        title: video.user.name || 'Nature Video',
        source: 'Pexels',
        time: 'Recently added',
        thumbnail: video.image,
        videoUrl: video.video_files[0]?.link || '',
      }));

      setVideos(fetchedVideos);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleVideoEnd = index => {
    console.log(`Video ${index + 1} ended`);
  };

  return (
    <View style={tw`flex-1`}>
      <LinearGradient colors={['white', '#c7f2ff']} style={tw`flex-1`}>
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" style={tw`mt-20`} />
        ) : (
          <FlatList
            data={videos}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <VideoCard
                video={item}
                autoPlay={index === 0} // Auto-play only the first video initially
                onVideoEnd={() => handleVideoEnd(index)}
              />
            )}
            pagingEnabled
            showsVerticalScrollIndicator={false}
            snapToAlignment="start"
            decelerationRate="fast"
            snapToInterval={height} // One video per screen
          />
        )}

        {/* Footer is placed independently */}
        <View style={styles.footerContainer}>
          <Footer />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = {
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Keep footer on top of the background
  },
};

export default VideoScreen;
