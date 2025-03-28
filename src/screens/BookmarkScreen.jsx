// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Pressable,
//   ActivityIndicator,
//   StyleSheet,
//   Dimensions,
//   Animated,
// } from 'react-native';
// import axios from 'axios';
// import tw from 'twrnc';
// import LinearGradient from 'react-native-linear-gradient';
// import {
//   GestureHandlerRootView,
//   PanGestureHandler,
// } from 'react-native-gesture-handler';
// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
// import BookmarkStoriesCard from '../components/BookmarkStoriesCard';
// import BookmarkVideosCard from '../components/BookmarkVideosCard';
// import Footer from '../components/Footer';

// const {width} = Dimensions.get('window');

// const BookmarkScreen = ({navigation}) => {
//   const [activeTab, setActiveTab] = useState('Stories');
//   const [stories, setStories] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const urls = [
//           'https://content.guardianapis.com/search?api-key=93db34eb-3dba-4c4f-8c68-4ca0dc5d30f7',
//           'https://gnews.io/api/v4/top-headlines?token=345ea6bb2d2ab572b8b4d559b6c9fc8f',
//           'https://api.pexels.com/videos/search?query=nature&per_page=10',
//         ];

//         const [guardian, gnews, pexels] = await Promise.all([
//           axios.get(urls[0]),
//           axios.get(urls[1]),
//           axios.get(urls[2], {
//             headers: {
//               Authorization:
//                 'W7QvTZNhcXq94mhsXYawXVWpyURCEO3Bc3GmYgPyMrbWq7Slz27TZvu1',
//             },
//           }),
//         ]);

//         const guardianData = guardian.data.response.results.map(
//           (item, index) => ({
//             id: `guardian-${index}`,
//             title: item.webTitle,
//             description: 'No description available',
//             imageUrl: 'https://via.placeholder.com/300',
//             websiteUrl: item.webUrl,
//             publishedDate: item.webPublicationDate,
//             source: 'The Guardian',
//           }),
//         );

//         const gnewsData = gnews.data.articles.map((item, index) => ({
//           id: `gnews-${index}`,
//           title: item.title,
//           description: item.description || 'No description available',
//           imageUrl: item.image || 'https://via.placeholder.com/300',
//           websiteUrl: item.url,
//           publishedDate: item.publishedAt,
//           source: item.source.name,
//         }));

//         const newsList = [...gnewsData, ...guardianData];
//         setStories(newsList);

//         const videosList = pexels.data.videos.map((video, index) => ({
//           id: `pexels-${index}`,
//           title: video.user.name || 'Nature Video',
//           desc: 'Explore the latest trending videos and stay updated!',
//           thumbnail: video.image || 'https://via.placeholder.com/300',
//           videoUrl: video.video_files[0]?.link || '#',
//         }));

//         setVideos(videosList);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleTabChange = tab => {
//     setActiveTab(tab);
//   };

//   // Swipeable Item Renderer
//   const renderItemWithSwipe = ({item}) => {
//     const translateX = new Animated.Value(0);

//     const onGestureEvent = Animated.event(
//       [{nativeEvent: {translationX: translateX}}],
//       {useNativeDriver: false},
//     );

//     const onGestureEnd = ({nativeEvent}) => {
//       Animated.spring(translateX, {
//         toValue: 0,
//         useNativeDriver: false,
//       }).start();
//     };

//     return (
//       <View style={styles.swipeContainer}>
//         <View style={styles.swipeBackground}>
//           <Text style={styles.swipeText}>Swipe</Text>
//         </View>

//         <PanGestureHandler
//           onGestureEvent={onGestureEvent}
//           onEnded={onGestureEnd}>
//           <Animated.View
//             style={[styles.swipeItem, {transform: [{translateX}]}]}>
//             {activeTab === 'Stories' ? (
//               <BookmarkStoriesCard story={item} navigation={navigation} />
//             ) : (
//               <BookmarkVideosCard video={item} navigation={navigation} />
//             )}
//           </Animated.View>
//         </PanGestureHandler>
//       </View>
//     );
//   };

//   return (
//     <GestureHandlerRootView style={{flex: 1}}>
//       <View style={tw`flex-1`}>
//         <LinearGradient colors={['white', '#c7f2ff']} style={styles.container}>
//           {/* Header */}
//           <View style={styles.headerContainer}>
//             <FontAwesomeIcon
//               icon={faArrowLeft}
//               size={20}
//               color="#000"
//               onPress={() => navigation.goBack()}
//             />
//             <Text style={styles.header}>My Bookmarks</Text>
//           </View>

//           {/* Tabs */}
//           <View style={styles.tabContainer}>
//             <Pressable
//               onPress={() => handleTabChange('Stories')}
//               style={[
//                 styles.tab,
//                 activeTab === 'Stories' ? styles.activeTab : styles.inactiveTab,
//               ]}>
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab === 'Stories'
//                     ? styles.activeText
//                     : styles.inactiveText,
//                 ]}>
//                 Stories
//               </Text>
//             </Pressable>

//             <Pressable
//               onPress={() => handleTabChange('Videos')}
//               style={[
//                 styles.tab,
//                 activeTab === 'Videos' ? styles.activeTab : styles.inactiveTab,
//               ]}>
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab === 'Videos'
//                     ? styles.activeText
//                     : styles.inactiveText,
//                 ]}>
//                 Videos
//               </Text>
//             </Pressable>
//           </View>

//           {loading ? (
//             <ActivityIndicator size="large" color="#00bfff" style={tw`mt-10`} />
//           ) : (
//             <FlatList
//               data={activeTab === 'Stories' ? stories : videos}
//               keyExtractor={item => item.id}
//               renderItem={renderItemWithSwipe}
//               contentContainerStyle={{padding: 10}}
//             />
//           )}
//         </LinearGradient>
//         <Footer />
//       </View>
//     </GestureHandlerRootView>
//   );
// };

// export default BookmarkScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: width * 0.9,
//     height: 84,
//     top: 30,
//     textAlign: 'center',
//     marginHorizontal: '5%',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginLeft: '10%',
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     marginTop: 16,
//   },
//   tab: {
//     flex: 1,
//     paddingVertical: 12,
//     alignItems: 'center',
//   },
//   activeTab: {
//     borderBottomWidth: 2,
//     borderBottomColor: '#01bef9',
//   },
//   inactiveTab: {
//     borderBottomWidth: 2,
//     borderBottomColor: 'transparent',
//   },
//   tabText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   activeText: {
//     color: '#01bef9',
//   },
//   inactiveText: {
//     color: '#555',
//   },

//   swipeBackground: {
//     position: 'absolute',
//     right: 0,
//     top: 0,
//     bottom: 0,
//     width: '100%',
//     backgroundColor: '#ff5252',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//     borderTopRightRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   swipeText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   swipeItem: {
//     backgroundColor: 'white',
//     borderTopRightRadius: 20,
//     borderBottomRightRadius: 20,
//   },
// });

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import tw from 'twrnc';
import LinearGradient from 'react-native-linear-gradient';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

import BookmarkStoriesCard from '../components/BookmarkStoriesCard';
import BookmarkVideosCard from '../components/BookmarkVideosCard';
import Footer from '../components/Footer';

const {width, height} = Dimensions.get('window');

const BookmarkScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Stories');
  const [stories, setStories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = [
          'https://content.guardianapis.com/search?api-key=93db34eb-3dba-4c4f-8c68-4ca0dc5d30f7',
          'https://api.pexels.com/videos/search?query=nature&per_page=10',
        ];

        const [guardian, pexels] = await Promise.all([
          axios.get(urls[0]),
          axios.get(urls[1], {
            headers: {
              Authorization:
                'W7QvTZNhcXq94mhsXYawXVWpyURCEO3Bc3GmYgPyMrbWq7Slz27TZvu1',
            },
          }),
        ]);

        const guardianData = guardian.data.response.results.map(
          (item, index) => ({
            id: `guardian-${index}`,
            title: item.webTitle,
            description: 'No description available',
            imageUrl:
              'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000',
            websiteUrl: item.webUrl,
            publishedDate: item.webPublicationDate,
            source: 'The Guardian',
          }),
        );

        setStories(guardianData);

        const videosList = pexels.data.videos.map((video, index) => ({
          id: `pexels-${index}`,
          title: video.user.name || 'Nature Video',
          desc: 'Explore the latest trending videos!',
          thumbnail: video.image || 'https://via.placeholder.com/150',
          videoUrl: video.video_files[0]?.link || '#',
        }));

        setVideos(videosList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  const renderItemWithSwipe = ({item}) => {
    const translateX = new Animated.Value(0);
    const backgroundOpacity = translateX.interpolate({
      inputRange: [-100, 0, 100],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp',
    });

    const onGestureEvent = Animated.event(
      [{nativeEvent: {translationX: translateX}}],
      {useNativeDriver: false},
    );

    const onGestureEnd = event => {
      if (event.nativeEvent.translationX < -100) {
        // Add your delete logic here
        console.log('Delete Item:', item.id);
      }
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    };

    return (
      <ScrollView>
        <View style={styles.cardContainer}>
          {/* Red Background when Swiping */}
          <Animated.View
            style={[styles.background, {opacity: backgroundOpacity}]}>
            <View style={styles.iconContainer}>
              <FontAwesomeIcon icon={faTrashAlt} size={50} color="white" />
            </View>
          </Animated.View>

          {/* Swipeable Card */}

          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onEnded={onGestureEnd}>
            <Animated.View
              style={[styles.swipeItem, {transform: [{translateX}]}]}>
              {activeTab === 'Stories' ? (
                <BookmarkStoriesCard story={item} navigation={navigation} />
              ) : (
                <BookmarkVideosCard video={item} navigation={navigation} />
              )}
            </Animated.View>
          </PanGestureHandler>
        </View>
      </ScrollView>
    );
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <LinearGradient colors={['#f0f0f0', '#c7f2ff']} style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            size={24}
            color="#000"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.header}>My Bookmarks</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <Pressable
            onPress={() => handleTabChange('Stories')}
            style={[
              styles.tab,
              activeTab === 'Stories' ? styles.activeTab : styles.inactiveTab,
            ]}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Stories'
                  ? styles.activeText
                  : styles.inactiveText,
              ]}>
              Stories
            </Text>
          </Pressable>

          <Pressable
            onPress={() => handleTabChange('Videos')}
            style={[
              styles.tab,
              activeTab === 'Videos' ? styles.activeTab : styles.inactiveTab,
            ]}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Videos'
                  ? styles.activeText
                  : styles.inactiveText,
              ]}>
              Videos
            </Text>
          </Pressable>
        </View>

        <ScrollView style={{flex: 1}}>
          {loading ? (
            <ActivityIndicator size="large" color="#00bfff" style={tw`mt-10`} />
          ) : (
            <FlatList
              ref={flatListRef}
              data={activeTab === 'Stories' ? stories : videos}
              keyExtractor={item => item.id}
              renderItem={renderItemWithSwipe}
              contentContainerStyle={{flexGrow: 1, padding: 10}}
            />
          )}
        </ScrollView>

        {/* Fixed Footer */}
        <View style={styles.footerContainer}>
          <Footer />
        </View>
      </LinearGradient>
    </GestureHandlerRootView>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    top: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    textAlign: 'center',
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#01bef9',
  },
  inactiveTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 18,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  cardContainer: {
    marginVertical: 10,
  },
  swipeItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  background: {
    position: 'absolute',
    backgroundColor: 'red', // Red background
    width: '100%',
    height: '100%',
    zIndex: -1,
    justifyContent: 'center',
    alignItems: 'flex-end', // Align icon to the right
    paddingRight: 20, // Add some spacing from the right edge
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
