import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import tw from 'twrnc';
import LinearGradient from 'react-native-linear-gradient';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import BookmarkStoriesCard from '../components/BookmarkStoriesCard';
import BookmarkVideosCard from '../components/BookmarkVideosCard';
import Footer from '../components/Footer';

const {width} = Dimensions.get('window');

const BookmarkScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Stories');
  const [stories, setStories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = [
          'https://content.guardianapis.com/search?api-key=93db34eb-3dba-4c4f-8c68-4ca0dc5d30f7',
          'https://gnews.io/api/v4/top-headlines?token=345ea6bb2d2ab572b8b4d559b6c9fc8f',
          'https://api.pexels.com/videos/search?query=nature&per_page=10',
        ];

        const [guardian, gnews, pexels] = await Promise.all([
          axios.get(urls[0]),
          axios.get(urls[1]),
          axios.get(urls[2], {
            headers: {
              Authorization:
                'W7QvTZNhcXq94mhsXYawXVWpyURCEO3Bc3GmYgPyMrbWq7Slz27TZvu1',
            },
          }),
        ]);

        // Parse Guardian & GNews data for stories
        const guardianData = guardian.data.response.results.map(
          (item, index) => ({
            id: `guardian-${index}`,
            title: item.webTitle,
            description: 'No description available',
            imageUrl:
              'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
            websiteUrl: item.webUrl,
            publishedDate: item.webPublicationDate,
            source: 'The Guardian',
          }),
        );

        const gnewsData = gnews.data.articles.map((item, index) => ({
          id: `gnews-${index}`,
          title: item.title,
          description: item.description || 'No description available',
          imageUrl:
            item.image ||
            'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
          websiteUrl: item.url,
          publishedDate: item.publishedAt,
          source: item.source.name,
        }));

        const newsList = [...gnewsData, ...guardianData];
        setStories(newsList);

        // Parse Pexels data for videos
        const videosList = pexels.data.videos.map((video, index) => ({
          id: `pexels-${index}`,
          title: video.user.name || 'Nature Video',
          desc: 'Explore the latest trending videos and stay updated!',
          thumbnail:
            video.image ||
            'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
          videoUrl: video.video_files[0]?.link || '#',
        }));

        setVideos(videosList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  return (
    <View style={tw`flex-1`}>
      <LinearGradient colors={['white', '#c7f2ff']} style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            size={20}
            color="#000"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.header}>My Bookmarks</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <Pressable
            onPress={() => handleTabChange('Stories')}
            style={[
              styles.tab,
              activeTab === 'Stories' ? styles.activeTab : styles.inactiveTab,
            ]}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Stories'
                  ? styles.activeText
                  : styles.inactiveText,
              ]}>
              Stories
            </Text>
          </Pressable>

          <Pressable
            onPress={() => handleTabChange('Videos')}
            style={[
              styles.tab,
              activeTab === 'Videos' ? styles.activeTab : styles.inactiveTab,
            ]}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Videos'
                  ? styles.activeText
                  : styles.inactiveText,
              ]}>
              Videos
            </Text>
          </Pressable>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#00bfff" style={tw`mt-10`} />
        ) : (
          <FlatList
            data={activeTab === 'Stories' ? stories : videos}
            keyExtractor={item => item.id}
            renderItem={({item}) =>
              activeTab === 'Stories' ? (
                <BookmarkStoriesCard story={item} navigation={navigation} />
              ) : (
                <BookmarkVideosCard video={item} navigation={navigation} />
              )
            }
            contentContainerStyle={{padding: 10}}
          />
        )}
      </LinearGradient>
      <Footer />
    </View>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.9,
    height: 84,
    top: 30,
    textAlign: 'center',
    marginHorizontal: '5%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: '10%',
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#01bef9', // Blue color for active tab
  },
  inactiveTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  activeText: {
    color: '#01bef9',
  },
  inactiveText: {
    color: '#555', // Gray color for inactive tab
  },
});
