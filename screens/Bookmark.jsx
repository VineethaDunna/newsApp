import React, { useState } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import VideoCard from '../components/VideoCard';
import tw from 'twrnc';

const { width, height } = Dimensions.get('window');

const Bookmark = () => {
  const [activeTab, setActiveTab] = useState('Stories');

  const videos = [
    { id: '1', title: 'March By Men And Women From Ladakh Stopped At Delhi Border', category: 'Stories', thumbnail: 'https://via.placeholder.com/150' },
    { id: '2', title: 'The Last Ride Of Vijay And Ajith Kumar: What Would The Twinless Twin Do?', category: 'Stories', thumbnail: 'https://via.placeholder.com/150' },
    { id: '3', title: 'India’s Corporate Boom: Not For The Greater Common Good', category: 'Videos', thumbnail: 'https://via.placeholder.com/150' },
    { id: '4', title: 'Commerce Minister Flip-Flops On E-Commerce', category: 'Videos', thumbnail: 'https://via.placeholder.com/150' },
    { id: '5', title: 'Breaking News: India Wins The Cricket World Cup', category: 'Videos', thumbnail: 'https://via.placeholder.com/150' }
  ];

  const filteredVideos = videos.filter((video) => video.category === activeTab);

  return (
    <View style={tw`flex-1 bg-white`}>
      
      {/* Header Section */}
      <View style={tw`p-5 bg-cyan-100`}>
        <Text style={tw`text-2xl font-bold text-gray-800`}>My Bookmarks</Text>

        {/* Tab Section */}
        <View style={tw`flex-row mt-4`}>
          <TouchableOpacity 
            onPress={() => setActiveTab('Stories')}
            style={tw`flex-1 p-3 items-center ${activeTab === 'Stories' ? 'border-b-2 border-blue-500' : ''}`}
          >
            <Text style={tw`text-lg ${activeTab === 'Stories' ? 'text-blue-500' : 'text-gray-500'}`}>Stories</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setActiveTab('Videos')}
            style={tw`flex-1 p-3 items-center ${activeTab === 'Videos' ? 'border-b-2 border-blue-500' : ''}`}
          >
            <Text style={tw`text-lg ${activeTab === 'Videos' ? 'text-blue-500' : 'text-gray-500'}`}>Videos</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Video List */}
      <FlatList
        data={filteredVideos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoCard video={item} />}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};

export default Bookmark;
