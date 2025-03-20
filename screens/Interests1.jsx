import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import tw from 'twrnc';

const interests = [
  'Automobile',
  'Business',
  'Education',
  'Entertainment',
  'Miscellaneous',
  'National',
  'International',
];

const Interest1 = ({navigation}) => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleSelection = item => {
    setSelectedInterests(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item],
    );
  };

  return (
    <View style={tw`flex-1 bg-cyan-100 px-6 pt-16`}>
      <View style={tw` flex-1 justify-between items-between`}>
        <Text style={tw`text-lg font-semibold text-center text-gray-800 mb-8`}>
          Please Select Your Interest
        </Text>
        <View style={tw`flex top-10 bottom-10 mt-5`}>
          <FlatList
            data={interests}
            keyExtractor={item => item}
            numColumns={2}
            columnWrapperStyle={tw` content-between justify-between mb-4`}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => toggleSelection(item)}
                style={tw`px-5 py-3 rounded-full shadow-md ${
                  selectedInterests.includes(item)
                    ? 'bg-gray-700 text-white'
                    : 'bg-white'
                }`}>
                <Text
                  style={tw`text-lg font-semibold ${
                    selectedInterests.includes(item)
                      ? 'text-white'
                      : 'text-gray-700'
                  }`}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        {/* Footer Buttons */}
        <View style={tw`flex-row justify-between content-between mt-auto mb-8`}>
          <TouchableOpacity onPress={() => navigation.navigate('interests2')}>
            <Text style={tw`text-gray-500 text-lg underline`}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={selectedInterests.length === 0}
            onPress={() =>
              navigation.navigate('interests2', {selectedInterests})
            }
            style={tw`px-8 py-3 rounded-full ${
              selectedInterests.length ? 'bg-gray-800' : 'bg-gray-400'
            }`}>
            <Text style={tw`text-white text-lg font-semibold`}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Interest1;
