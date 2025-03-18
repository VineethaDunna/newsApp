import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const topics = [
  {id: '1', title: 'Bengaluru Fridge Murder', stories: '8 Stories'},
  {id: '2', title: 'Lapata Ladies Oscar Entry', stories: '13 Stories'},
  {id: '3', title: 'Badlapur Accused Encounter', stories: '14 Stories'},
  {id: '4', title: 'India Chess Olympiad Win', stories: '12 Stories'},
];

const TrendingTopics = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.card}>
      {/* Thumbnails */}
      <View style={styles.thumbnailContainer}>
        {[...Array(3)].map((_, index) => (
          <Image
            key={index}
            source={{uri: 'https://via.placeholder.com/150'}}
            style={styles.thumbnail}
          />
        ))}
      </View>

      {/* Text and Stories */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.stories}>{item.stories}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* <Icon name="arrow-back" size={28} color="#000" /> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trending Topics</Text>
      </View>

      {/* List of Topics */}
      <FlatList
        data={topics}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {/* <Icon name="home" size={28} color="#fff" />
        <Icon name="play-circle-filled" size={28} color="#fff" />
        <Icon name="search" size={28} color="#fff" /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3f4ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#d3f4ff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#4f85ff',
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stories: {
    color: '#ccc',
    fontSize: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default TrendingTopics;
