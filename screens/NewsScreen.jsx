import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  Dimensions,
  ActivityIndicator,
  Text,
} from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import Footer from '../components/Footer';

const {height} = Dimensions.get('window');

const NewsScreen = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const urls = [
        'https://content.guardianapis.com/search?api-key=93db34eb-3dba-4c4f-8c68-4ca0dc5d30f7',
        'https://gnews.io/api/v4/top-headlines?token=345ea6bb2d2ab572b8b4d559b6c9fc8f',
        //   'https://api.currentsapi.services/v1/latest-news?&apiKey=u5QinkzpeHQr8KM1JTlwpX3nxDj81I7D85YfgTD97zToHS86',
        //   'https://newsapi.org/v2/top-headlines?language=en&apiKey=3ea2b2e2bb1043abbbdb62f70a66a94f',
      ];

      const [guardian, gnews, currents, newsapi] = await Promise.all(
        urls.map(url => axios.get(url)),
      );

      // Format Guardian API data
      const guardianData = guardian.data.response.results.map(
        (item, index) => ({
          id: `guardian-${index}`,
          title: item.webTitle || 'No Title',
          description:
            item.description ||
            'Breaking news reveals the latest updates on global events, politics, technology, sports, and entertainment, providing real-time information to keep audiences informed and engaged with current affairs',
          imageUrl: 'https://m.media-amazon.com/images/I/31wkyNnzwIL.jpg', // Placeholder image as Guardian API doesn't have images
          websiteUrl: item.webUrl,
          publishedDate: item.webPublicationDate,
          source: 'The Guardian',
          author: 'Unknown',
        }),
      );

      // // Format GNews API data
      const gnewsData = gnews.data.articles.map((item, index) => ({
        id: `gnews-${index}`,
        title: item.title,
        description: item.description || 'No description available',
        imageUrl: item.image || 'https://via.placeholder.com/300',
        websiteUrl: item.url,
        publishedDate: item.publishedAt,
        source: item.source.name,
        author: item.author || 'Unknown',
      }));

      // // Format Currents API data
      // const currentsData = currents.data.news.map((item, index) => ({
      //   id: `currents-${index}`,
      //   title: item.title,
      //   description: item.description || 'No description available',
      //   imageUrl: item.image || 'https://via.placeholder.com/300',
      //   websiteUrl: item.url,
      //   publishedDate: item.published,
      //   source: 'Currents API',
      //   author: item.author || 'Unknown',
      // }));

      // // Format NewsAPI data
      // const newsapiData = newsapi.data.articles.map((item, index) => ({
      //   id: `newsapi-${index}`,
      //   title: item.title,
      //   description: item.description || 'No description available',
      //   imageUrl: item.urlToImage || 'https://via.placeholder.com/300',
      //   websiteUrl: item.url,
      //   publishedDate: item.publishedAt,
      //   source: item.source.name,
      //   author: item.author || 'Unknown',
      // }));

      // Combine all news into one array
      const bytesList = [
        ...gnewsData,
        ...guardianData,

        // ...currentsData,
        // ...newsapiData,
      ];

      setNewsData(bytesList);
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
    <View style={tw`flex-1 bg-cyan-100 bg-opacity-50`}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={newsData}
          keyExtractor={item => item.id}
          renderItem={({item}) => <NewsCard item={item} />}
          pagingEnabled={true}
          snapToInterval={height}
          snapToAlignment="start"
          decelerationRate="fast"
          getItemLayout={(data, index) => ({
            length: height,
            offset: height * index,
            index,
          })}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default NewsScreen;
