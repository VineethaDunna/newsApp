import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faCircleCheck,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native'; // ✅ Import navigation
import Footer from '../components/Footer';
import LoadingCard from '../components/LoadingCard';

const TrendingScreen = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('Latest');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Latest');
  const [hideFilter, setHideFilter] = useState(false); // ✅ Toggle filter visibility

  const navigation = useNavigation();
  const filters = [
    'This week',
    'Politics',
    'Health',
    'World',
    'Asia',
    'South America',
    'Add Filter',
  ];

  const sortingOptions = ['Latest', 'Previous', 'Top', 'Trend'];

  // ✅ Fetch News Data
  const fetchNews = async () => {
    try {
      const url =
        'https://content.guardianapis.com/search?api-key=93db34eb-3dba-4c4f-8c68-4ca0dc5d30f7';

      const response = await axios.get(url);

      const guardianData = response.data.response.results.map(
        (item, index) => ({
          id: `guardian-${index}`,
          title: item.webTitle || 'No Title',
          description: 'Latest news updates on global events.', // Fallback description
          imageUrl: 'https://m.media-amazon.com/images/I/31wkyNnzwIL.jpg',
          websiteUrl: item.webUrl,
          publishedDate: item.webPublicationDate,
          source: 'The Guardian',
        }),
      );

      setNewsData(guardianData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleFilterPress = filter => {
    setSelectedFilter(filter);
  };

  // ✅ Toggle Dropdown
  const toggleDropdown = () => {
    setDropdownVisible(prev => !prev);
  };

  // ✅ Handle Sort Selection
  const handleSortSelect = sort => {
    setSelectedSort(sort);
    setDropdownVisible(false);
  };

  // ✅ Handle Scroll to Hide/Show Filter
  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 50) {
      setHideFilter(true); // Hide when scrolling down
    } else {
      setHideFilter(false); // Show when scrolling up
    }
  };

  const renderItem = ({item}) => (
    <View
      style={styles.card}
      onPress={() => console.log(`Open: ${item.websiteUrl}`)}>
      <Image source={{uri: item.imageUrl}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.sourceRow}>
          <Text style={styles.source}>{item.source}</Text>

          {/* Trusted Icon */}
          <FontAwesomeIcon
            icon={faCircleCheck}
            size={14}
            style={{marginLeft: 8}}
            color="#1DA1F2"
          />
          <Text style={styles.date}>
            {moment(item.publishedDate).format('MMM DD, YYYY')}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
      <LinearGradient colors={['white', '#c7f2ff']} style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            size={20}
            style={{left: 12}}
            color="#000"
            onPress={() => navigation.goBack()} // ✅ Navigation working properly
          />
          <Text style={styles.header}>Trending Topics</Text>
        </View>

        {/* Filter Section */}
        {!hideFilter && (
          <View style={styles.filterWrapper}>
            {filters.map((filter, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.filterButton,
                  selectedFilter === filter && styles.activeFilter,
                ]}
                onPress={() => handleFilterPress(filter)}>
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === filter && styles.activeFilterText,
                  ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* news header */}
        <View style={styles.newsHeader}>
          <View>
            <Text style={styles.newsTitle}>News</Text>
            <Text style={styles.storyCount}>
              {loading ? 'Loading...' : `${newsData.length} Results found:`}
            </Text>
          </View>

          {/* Sort Dropdown */}
          <View style={styles.sortWrapper}>
            <TouchableOpacity
              style={styles.sortButton}
              onPress={toggleDropdown}>
              <Text style={styles.sortText}>Sort by: {selectedSort}</Text>
              <FontAwesomeIcon
                icon={dropdownVisible ? faChevronUp : faChevronDown}
                size={12}
                color="#000"
              />
            </TouchableOpacity>

            {/* Dropdown Menu */}
            {dropdownVisible && (
              <View style={styles.dropdown}>
                {sortingOptions.map((sort, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dropdownItem,
                      selectedSort === sort && styles.activeDropdownItem,
                    ]}
                    onPress={() => handleSortSelect(sort)}>
                    <Text style={styles.dropdownText}>{sort}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* News Cards */}
        {loading ? (
          <LoadingCard />
        ) : (
          <FlatList
            data={newsData}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 20}}
            onScroll={handleScroll} // ✅ Handle Scroll to hide/show filter
          />
        )}
        <Footer />
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 360,
    height: 84,
    left: 26,
    top: 24,
  },
  header: {
    fontSize: 24,
    fontFamily: 'Roboto',
    position: 'absolute',
    left: 100,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  filterWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    left: 16,
    top: 10,
    marginBottom: 5,
    borderBottomColor: '#eee',
  },
  filterButton: {
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderWidth: 1, // Correct way to add a border
    borderRadius: 7,
    borderColor: '#E0E0E0', // Border color
    margin: 5,
  },
  activeFilter: {
    backgroundColor: '#B3E5FC',
  },
  filterText: {
    fontSize: 17,
    color: '#333',
  },
  activeFilterText: {
    color: '#007BFF',
  },

  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  storyCount: {
    color: '#666',
    fontSize: 14,
  },
  sortWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    fontSize: 14,
    marginRight: 5,
  },
  loader: {
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 8,
    margin: 10,
    padding: 5,
  },
  image: {
    width: 100,
    height: '100%',
    borderRadius: 8,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  source: {
    marginLeft: 5,
    fontSize: 14,
    color: 'gray',
  },
  date: {
    marginLeft: 10,
    fontSize: 12,
    color: '#888',
    position: 'absolute',
    right: 0,
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5,
    zIndex: 10,
  },
  dropdownItem: {
    padding: 10,
  },
  activeDropdownItem: {
    backgroundColor: '#01bef9',
    color: 'white',
  },
  dropdownText: {
    fontSize: 16,
  },
});

export default TrendingScreen;
