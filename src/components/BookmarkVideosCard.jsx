import React from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';

const BookmarkVideosCard = ({video, navigation}) => {
  return (
    <>
      <Pressable
        onPress={() => navigation.navigate('videoScreen')}
        style={styles.card}>
        <Image
          source={{uri: video.thumbnail}}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <Text style={styles.desc}>{video.desc}</Text>
          <Text style={styles.title}>{video.title}</Text>
        </View>
      </Pressable>

      {/* Separator line */}
      <View style={styles.separator} />
    </>
  );
};

export default BookmarkVideosCard;

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
    marginTop: 5,
    borderRadius: 12,
  },
  content: {
    padding: 5,
  },
  desc: {
    fontSize: 18,
    fontWeight: 'bold',

    color: '#333',
  },
  title: {
    fontSize: 16,
    color: '#555',
  },
  separator: {
    height: 2,
    backgroundColor: '#ccc', // Line color

    marginHorizontal: 5,
  },
});
