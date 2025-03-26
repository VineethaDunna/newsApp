import React, {useState, useEffect} from 'react';
import {View, Dimensions, ActivityIndicator} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'twrnc';
import NewsCard from '../components/NewsCard';
import {FlashList} from '@shopify/flash-list';
import LoadingCard from '../components/LoadingCard';

const {height} = Dimensions.get('window');

const NewsScreen = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const urls = [
        'https://content.guardianapis.com/search?api-key=93db34eb-3dba-4c4f-8c68-4ca0dc5d30f7',
        'https://gnews.io/api/v4/top-headlines?token=345ea6bb2d2ab572b8b4d559b6c9fc8f',
      ];

      const [guardian, gnews] = await Promise.all(
        urls.map(url => axios.get(url)),
      );

      // Format Guardian API data
      const guardianData = guardian.data.response.results.map(
        (item, index) => ({
          id: `guardian-${index}`,
          title: item.webTitle || 'No Title',
          description:
            item.description ||
            'Latest news updates on global events, politics, and sports.',
          imageUrl: 'https://m.media-amazon.com/images/I/31wkyNnzwIL.jpg',
          websiteUrl: item.webUrl,
          publishedDate: item.webPublicationDate,
          source: 'The Guardian',
        }),
      );

      // Format GNews API data
      const gnewsData = gnews.data.articles.map((item, index) => ({
        id: `gnews-${index}`,
        title: item.title,
        description: item.description || 'No description available',
        imageUrl: item.image || 'https://via.placeholder.com/300',
        websiteUrl: item.url,
        publishedDate: item.publishedAt,
        source: item.source.name,
      }));

      // Combine all news into one array
      const newsList = [...gnewsData, ...guardianData];

      setNewsData(newsList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <View style={tw`flex-1`}>
      {/* ✅ Apply flex: 1 to LinearGradient */}
      <LinearGradient colors={['white', '#c7f2ff']} style={{flex: 1}}>
        {loading ? (
          <LoadingCard />
        ) : (
          <FlashList
            data={newsData}
            keyExtractor={item => item.id}
            renderItem={({item}) => <NewsCard item={item} />}
            estimatedItemSize={height} // Optimized rendering
            pagingEnabled // One card per screen
            snapToInterval={height} // Scroll by screen height
            decelerationRate="fast" // Smooth scrolling
            showsVerticalScrollIndicator={false}
          />
        )}
      </LinearGradient>
    </View>
  );
};

export default NewsScreen;
