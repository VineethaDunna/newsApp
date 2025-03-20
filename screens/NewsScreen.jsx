import React, {useState} from 'react';
import {FlatList, View, Dimensions} from 'react-native';
import tw from 'twrnc';
import NewsCard from '../components/NewsCard';
import Footer from '../components/Footer';

const {height} = Dimensions.get('window');

const newsData = [
  {
    id: '1',
    title: 'The Last Ride of Vijay and Ajith Kumar',
    description: `Twinless twin syndrome is a rare psychological condition that arises when a twin loses their sibling, creating a profound emotional void. 
      The narrative reflects the emotional turmoil of losing a twin, raising questions about individuality, loss, and identity. Critics have praised these films for portraying the psychological aspects of such a loss with sensitivity and realism.`,
    date: 'Few hours ago',
    source: 'NDTV',
    image:
      'https://i.pinimg.com/736x/de/5f/f6/de5ff6977451e2a7ab418ae6b8856a02.jpg',
    likes: 120,
    dislikes: 15,
    comments: 45,
  },
  {
    id: '2',
    title: 'AI Revolutionizing Healthcare',
    description: `Artificial Intelligence (AI) is transforming the healthcare sector by enhancing diagnostics, enabling predictive analytics, and personalizing patient care.
      AI-powered systems can detect diseases like cancer at an early stage by analyzing medical images with higher accuracy than human doctors. 
         However, ethical concerns around data privacy and biases in AI models remain hot topics in the industry.`,
    date: '1 day ago',
    source: 'BBC News',
    image: 'https://etimg.etb2bimg.com/photo/111875550.cms',
    likes: 320,
    dislikes: 25,
    comments: 68,
  },
  {
    id: '3',
    title: 'SpaceX Launches Starship',
    description: `SpaceX has successfully launched its Starship spacecraft, marking a significant milestone in the company’s mission to enable human colonization of Mars.
      The reusable rocket, capable of carrying large payloads, is designed to transport both cargo and passengers. 
    The launch has generated widespread interest, sparking debates about the future of space travel, commercial space tourism, and interplanetary colonization.`,
    date: '2 days ago',
    source: 'CNN',
    image:
      'https://bsmedia.business-standard.com/_media/bs/img/article/2024-10/14/full/1728879741-7642.jpg?im=FeatureCrop,size=(826,465)',
    likes: 780,
    dislikes: 50,
    comments: 210,
  },
  {
    id: '4',
    title: 'Global Warming Impact on Oceans',
    description: `Global warming is having a devastating effect on oceans, with rising sea levels becoming a major concern. 
      Melting polar ice caps and thermal expansion of water are causing sea levels to rise at an alarming rate. 
        Scientists warn that if carbon emissions are not reduced, the consequences for coastal populations and biodiversity will be catastrophic.`,
    date: '3 days ago',
    source: 'Nature Journal',
    image: 'https://climatekids.nasa.gov/ocean/the-bahamas.jpg',
    likes: 540,
    dislikes: 70,
    comments: 150,
  },
  {
    id: '5',
    title: 'Tesla Unveils Cybertruck',
    description: `Tesla has finally unveiled its highly anticipated Cybertruck, a futuristic electric pickup truck with a striking angular design.
      Built from ultra-hard stainless steel and armored glass, the Cybertruck boasts a range of over 500 miles on a single charge. 
      Elon Musk announced that pre-orders have already surpassed 1 million, demonstrating the growing interest in electric vehicles.`,
    date: '4 days ago',
    source: 'Reuters',
    image:
      'https://techcrunch.com/wp-content/uploads/2019/11/cybertruck-5.png?w=1024',
    likes: 890,
    dislikes: 120,
    comments: 320,
  },
];
const NewsScreen = () => {
  const [globalFooterVisible, setGlobalFooterVisible] = useState(true);

  const toggleFooter = () => {
    setGlobalFooterVisible(prev => !prev);
  };

  return (
    <View style={tw`flex-1 bg-cyan-100  bg-opacity-50`}>
      <FlatList
        data={newsData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <NewsCard
            item={item}
            globalFooterVisible={globalFooterVisible}
            toggleFooter={toggleFooter}
          />
        )}
        pagingEnabled={true} // Full-screen paging effect
        snapToInterval={height} // Snap to full screen
        snapToAlignment="start" // Align at the start
        decelerationRate="fast" // Smooth scrolling
        getItemLayout={(data, index) => ({
          length: height, // Ensure full-screen height
          offset: height * index, // Scroll offset
          index,
        })}
        showsVerticalScrollIndicator={false}
      />
      {globalFooterVisible && (
        <>
          <Footer />
        </>
      )}
    </View>
  );
};

export default NewsScreen;
