import React from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';

const BookmarkStoriesCard = ({story, navigation}) => {
  return (
    <View>
      <Pressable
        onPress={() => navigation.navigate('newsScreen')}
        style={styles.card}>
        <Image
          source={{uri: story.imageUrl}}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={styles.title}>{story.title}</Text>
        </View>
        {/* Separator line */}
      </Pressable>
      <View style={styles.separator} />
    </View>
  );
};

export default BookmarkStoriesCard;
const styles = StyleSheet.create({
  card: {
    marginVertical: 5, // Spacing between cards
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    marginBottom: 8,
  },
  separator: {
    height: 2,
    backgroundColor: '#ccc', // Line color
    marginTop: 8,
  },
});
