import React from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAnglesLeft} from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';

const topics = [
  {
    id: '1',
    title: 'Bengaluru Fridge Murder',
    stories: '8 Stories',
    images: [
      'https://imagesvs.oneindia.com/img/2024/09/laapataa-ladies-small-1727078676.jpg',
      'https://imagesvs.oneindia.com/img/2024/09/laapataa-ladies-small-1727078676.jpg',
      'https://imagesvs.oneindia.com/img/2024/09/laapataa-ladies-small-1727078676.jpg',
    ],
  },
  {
    id: '2',
    title: 'Lapata Ladies Oscar Entry',
    stories: '13 Stories',
    images: [
      'https://imagesvs.oneindia.com/img/2024/09/laapataa-ladies-small-1727078676.jpg',
      'https://imagesvs.oneindia.com/img/2024/09/laapataa-ladies-small-1727078676.jpg',
      'https://imagesvs.oneindia.com/img/2024/09/laapataa-ladies-small-1727078676.jpg',
    ],
  },
  {
    id: '3',
    title: 'Badlapur Accused Encounter',
    stories: '14 Stories',
    images: [
      'https://imagesvs.oneindia.com/img/2024/09/laapataa-ladies-small-1727078676.jpg',
      'https://imagesvs.oneindia.com/img/2024/09/laapataa-ladies-small-1727078676.jpg',
      'https://imagesvs.oneindia.com/img/2024/09/laapataa-ladies-small-1727078676.jpg',
    ],
  },
  {
    id: '4',
    title: 'India Chess Olympiad Win',
    stories: '12 Stories',
    images: [
      'https://imagesvs.oneindia.com/img/2024/09/laapataa-ladies-small-1727078676.jpg',
      'https://imagesvs.oneindia.com/img/2024/09/laapataa-ladies-small-1727078676.jpg',
      'https://imagesvs.oneindia.com/img/2024/09/laapataa-ladies-small-1727078676.jpg',
    ],
  },
];

const TopicCard = ({topic, navigation}) => (
  <TouchableOpacity onPress={() => navigation.navigate('newsScreen')}>
    <View style={tw`bg-gray-800 m-4 mt-0 gap-4 p-3 rounded-2xl mb-5 shadow-lg`}>
      <View style={tw`flex-row justify-between`}>
        {topic.images.map((image, index) => (
          <Image
            key={index}
            source={{uri: image}}
            style={tw`w-25 h-20 rounded-lg mr-2`}
            resizeMode="cover"
          />
        ))}
      </View>

      <View style={tw`mt-4 flex-row justify-between items-center `}>
        <Text style={tw`text-white text-lg font-semibold`}>{topic.title}</Text>
        <Text style={tw`text-gray-400 text-sm`}>{topic.stories}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const TrendingTopicsScreen = ({navigation}) => {
  return (
    <View style={tw`flex-1 pt-10 bg-blue-100`}>
      <View style={tw`flex-row items-center justify-between p-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faAnglesLeft} size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-2xl font-bold text-black`}>Trending Topics</Text>
        <View style={tw`w-10`} />
      </View>

      {/* Topics List */}
      <ScrollView contentContainerStyle={tw`pb-20`}>
        {topics.map(topic => (
          <TopicCard key={topic.id} topic={topic} navigation={navigation} />
        ))}
      </ScrollView>

      {/* Footer */}
      <Footer />
    </View>
  );
};

export default TrendingTopicsScreen;
