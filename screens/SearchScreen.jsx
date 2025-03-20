import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import tw from 'twrnc';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMapMarkerAlt, faStar} from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';

const SearchScreen = () => {
  const [favorites, setFavorites] = useState({});

  const trendingTopics = [
    {
      id: '1',
      title:
        'The Last Ride Of Vijay And Ajith Kumar: What Would The Twinless Twin Do?',
      image: 'https://etimg.etb2bimg.com/photo/111875550.cms',
    },
    {
      id: '2',
      title: 'March By Men And Women From Ladakh Stopped At Delhi Border',
      image: 'https://etimg.etb2bimg.com/photo/111875550.cms',
    },
    {
      id: '3',
      title: 'Indias Corporate Boom: Not For The Greater Common Good',
      image: 'https://etimg.etb2bimg.com/photo/111875550.cms',
    },
    {
      id: '4',
      title: 'Commerce Minister Flip-Flops On E-Commerce',
      image: 'https://etimg.etb2bimg.com/photo/111875550.cms',
    },
  ];

  const locations = [
    'New Delhi, India',
    'Gurugram, India',
    'Chandigarh, India',
    'Mumbai, India',
  ];

  // Toggle favorite state for locations
  const toggleFavorite = location => {
    setFavorites(prev => ({
      ...prev,
      [location]: !prev[location],
    }));
  };

  return (
    <View style={tw`flex-1 bg-cyan-100 bg-opacity-50 pt-10 `}>
      {/* Search Bar */}
      <View style={tw`p-4`}>
        <TextInput
          placeholder="Search news bytes"
          style={tw`bg-white p-4 rounded-full shadow-md text-gray-800`}
        />
      </View>

      <ScrollView contentContainerStyle={tw`p-4 pb-20`}>
        {/* Trending Topics Section */}
        <Text style={tw`text-lg font-bold text-gray-800 m-0`}>
          Trending Topics
        </Text>

        {trendingTopics.map(item => (
          <TouchableOpacity key={item.id} style={tw`flex-row items-center p-2`}>
            <Image
              source={{uri: item.image}}
              style={tw`w-15 h-15 rounded-lg mr-4`}
              resizeMode="cover"
            />
            <View style={tw`flex-1`}>
              <Text style={tw`text-gray-900 font-semibold`}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* News by Location Section */}
        <Text style={tw`text-lg font-bold text-gray-800 mt-5 mb-3`}>
          News By Location
        </Text>

        {locations.map((location, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleFavorite(location)}
            style={tw`flex-row justify-between items-center p-4 border-b border-gray-300`}>
            <View style={tw`flex-row items-center`}>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                size={20}
                color="#4F46E5"
              />
              <Text style={tw`ml-4 text-gray-900`}>{location}</Text>
            </View>

            <FontAwesomeIcon
              icon={faStar}
              size={20}
              color={favorites[location] ? '#FFD700' : '#B0B0B0'}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Footer />
    </View>
  );
};

export default SearchScreen;
