import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import tw from 'twrnc';
import LinearGradient from 'react-native-linear-gradient';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHeart,
  faComment,
  faBookmark,
  faVolumeUp,
  faCircleCheck,
  faPlus,
  faShare,
  faArrowUp,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
// import {faShareFromSquare} from '@fortawesome/free-regular-svg-icons';
import Footer from './Footer';
import {text} from '@fortawesome/fontawesome-svg-core';
import {max, min} from 'moment';

const {height, width} = Dimensions.get('window');

const NewsCard = ({item}) => {
  const [likes, setLikes] = useState(120);
  const [comments] = useState(699);
  const [shares] = useState(800);
  const [bookmarked, setBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [lastTap, setLastTap] = useState(null);
  const [footerVisible, setFooterVisible] = useState(true);
  const [navbarVisible, setNavbarVisible] = useState(false);

  // commentsmodal
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState([
    {
      id: 1,
      name: 'Vishal Juneja',
      time: '2h ago',
      comment: 'Best app used by me till now for news. Great Design 👍',
    },
    {
      id: 2,
      name: 'Rohit Joshi',
      time: '1h ago',
      comment: 'Must used app. Algorithm is awesome. Design is also nice...',
    },
  ]);
  // Handle adding comments
  const handleAddComment = () => {
    if (newComment.trim()) {
      const newEntry = {
        id: commentList.length + 1,
        name: 'You',
        comment: newComment,
        time: 'Just now',
      };
      setCommentList([newEntry, ...commentList]);
      setNewComment('');
    }
  };

  // Toggle Bookmark
  const toggleBookmark = () => setBookmarked(!bookmarked);

  // Like handler
  const handleLike = () => {
    setLikes(prev => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };

  // Double tap for full-screen mode
  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap && now - lastTap < 300) {
      setIsFullScreen(!isFullScreen);
    } else {
      setLastTap(now);
    }
  };

  // Toggle between navbar and footer
  const handleToggleVisibility = () => {
    if (footerVisible) {
      setFooterVisible(false);
      setNavbarVisible(true);
    } else {
      setFooterVisible(true);
      setNavbarVisible(false);
    }
  };

  // Auto-hide sections after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setFooterVisible(true);
      setNavbarVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [footerVisible, navbarVisible]);

  return (
    <TouchableWithoutFeedback
      onPress={handleToggleVisibility}
      onLongPress={handleDoubleTap}>
      <View
        style={[
          styles.cardContainer,
          {
            height: isFullScreen ? '100%' : height,
            width: isFullScreen ? '100%' : 'auto',
          },
        ]}>
        <LinearGradient colors={['white', '#c7f2ff']} style={{flex: 1}}>
          {/* Image Section */}
          <View style={styles.imageContainer}>
            <TouchableWithoutFeedback onPress={handleDoubleTap}>
              <Image
                source={{uri: item.imageUrl}}
                style={[
                  styles.image,
                  {
                    width: isFullScreen ? 378 : 378,
                    height: isFullScreen ? 800 : 370,
                  },
                ]}
                resizeMode="cover"
              />
            </TouchableWithoutFeedback>

            {/* Top Left Tag */}

            <View style={styles.tagContainer}>
              <Text style={styles.tagText}>Bytes</Text>
            </View>

            {/* Bookmark Icon */}

            <TouchableOpacity
              onPress={toggleBookmark}
              style={styles.bookmarkIcon}>
              <FontAwesomeIcon
                icon={faBookmark}
                size={20}
                color={bookmarked ? '#06b6ff' : 'white'}
              />
            </TouchableOpacity>
          </View>
          {}
          {/* Content Section */}
          {!isFullScreen && (
            <View>
              <View
                style={tw`flex-row items-center top-[10px] left-[16px] w-[370px]`}>
                {/* Logo */}
                <Image
                  source={{
                    uri: 'https://images.icon-icons.com/70/PNG/512/bbc_news_14062.png',
                  }}
                  style={tw`w-11 h-12 rounded-full mr-4`}
                  resizeMode="contain"
                />

                {/* Title and Verified Icon */}
                <View style={tw`flex-1`}>
                  <View style={tw`flex-row items-center`}>
                    <Text style={tw`text-lg font-bold mr-2`}>
                      {item.source}
                    </Text>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      size={18}
                      color="#1DA1F2"
                    />
                  </View>
                </View>

                {/* Follow Button */}
                <TouchableOpacity
                  style={tw`flex-row items-center bg-[#767680] bg-opacity-12 px-4 py-2 rounded-full border border-gray-100`}>
                  <FontAwesomeIcon icon={faPlus} size={14} color="#1DA1F2" />
                  <Text style={tw`text-blue-500 ml-2 text-sm font-bold`}>
                    Follow
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          )}

          {/* Footer Section */}
          {footerVisible && !isFullScreen && (
            <View style={styles.footerContainer}>
              <View style={tw`flex flex-row gap-2 items-center`}>
                <FontAwesomeIcon icon={faArrowUp} size={14} color="gray" />
                <Text style={styles.swipeText}> Swipe up to read more</Text>
              </View>
              <View style={styles.footerStats}>
                <TouchableOpacity
                  style={styles.footerButton}
                  onPress={handleLike}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    size={24}
                    color={isLiked ? 'red' : 'white'}
                  />
                  <Text style={styles.footerText}>
                    {likes >= 1000 ? ` ${(likes / 1000).toFixed(1)}k` : likes}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={tw`flex-row items-center`}
                  onPress={() => setIsCommentModalVisible(true)}>
                  <FontAwesomeIcon icon={faComment} size={24} color="white" />
                  <Text style={tw`ml-2 text-white`}>{comments}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.footerButton}>
                  <FontAwesomeIcon icon={faShare} size={24} color="white" />
                  <Text style={styles.footerText}>{shares}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {navbarVisible && !isFullScreen && (
            <>
              <View style={styles.sourceContainer}>
                <Text style={styles.sourceText}>{item.publishedDate}</Text>

                {/* Sound and Share Icons */}
                <View style={styles.iconRow}>
                  <TouchableOpacity style={styles.iconButton}>
                    <FontAwesomeIcon
                      icon={faVolumeUp}
                      size={22}
                      color="#01bef9"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.iconButton}>
                    <FontAwesomeIcon icon={faShare} size={22} color="#01bef9" />
                  </TouchableOpacity>
                </View>
              </View>
              <Footer />
            </>
          )}
          {/* Modal for Comments */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isCommentModalVisible}
            onRequestClose={() => setIsCommentModalVisible(false)}>
            <TouchableWithoutFeedback
              onPress={() => setIsCommentModalVisible(false)}>
              <View style={styles.modalContainer}>
                <TouchableWithoutFeedback>
                  <View style={styles.commentsBox}>
                    <Text style={styles.modalHeader}>
                      Comments ({commentList.length})
                    </Text>

                    {/* Comments List */}
                    <ScrollView style={{maxHeight: height * 0.3}}>
                      {commentList.map(comment => (
                        <View key={comment.id} style={styles.commentContainer}>
                          {/* Image, Name, and Time in Row */}
                          <View style={styles.commentRow}>
                            <Image
                              source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
                              }}
                              style={styles.profileImage}
                            />
                            <View style={styles.commentDetails}>
                              <Text style={styles.commentName}>
                                {comment.name}
                              </Text>
                              <Text style={styles.commentTime}>
                                {comment.time}
                              </Text>
                            </View>
                          </View>

                          {/* Vertical line and comment text in row */}
                          <View style={styles.commentContentRow}>
                            <View style={styles.verticalLine} />
                            <Text style={styles.commentText}>
                              {comment.comment}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </ScrollView>

                    {/* Add Comment */}
                    <View style={styles.addCommentContainer}>
                      <TextInput
                        placeholder="Add your comment"
                        value={newComment}
                        onChangeText={setNewComment}
                        style={styles.commentInput}
                      />
                      <TouchableOpacity
                        onPress={handleAddComment}
                        style={styles.sendButton}>
                        <FontAwesomeIcon
                          icon={faPaperPlane}
                          size={30}
                          color="#3c4852"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NewsCard;

const styles = {
  cardContainer: {
    opacity: 0.9,
    borderRadius: 20,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 20,
  },
  image: {
    borderRadius: 30,
    marginTop: 64,
    marginLeft: 16,
    marginRight: 16,
  },
  tagContainer: {
    position: 'absolute',
    top: 84,
    left: 36,
    width: 60,
    height: 24,
    backgroundColor: 'white',

    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 12,
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 84,
    right: 36,
    width: 24,
    height: 24,
  },
  contentContainer: {
    width: 378,
    height: 310,
    top: 15,
    left: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: 700,
    color: '#2c2c2c',
  },
  description: {
    color: '#3c4852',
    fontSize: 14,
    fontWeight: 400,
    marginTop: 10,
    lineHeight: 22,
    fontFamily: 'Poppins',
  },
  sourceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10, // 16px side gaps
    zIndex: 5,
    bottom: 50,
  },
  sourceText: {
    color: '#3c4852',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    letterSpacing: 2,
    fontStyle: 'italic',
  },
  iconRow: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderColor: 'gray',
    borderWidth: 0.5,
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  swipeText: {
    color: '#3c4852',
    fontSize: 14,
    letterSpacing: 1.5,
    fontWeight: 400,
    fontStyle: 'italic',
    lineHeight: 16,
  },
  footerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#007aff',
    padding: 15,
    borderRadius: 40,
    width: 260,
    height: 56,
    top: 10,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    marginLeft: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  openButton: {
    padding: 12,
    backgroundColor: '#007aff',
    borderRadius: 10,
    alignItems: 'center',
  },
  openButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    minHeight: height * 0.5,
  },
  commentsBox: {
    borderRadius: 40,
    margin: 16,
    padding: 10,
    color: 'white',
    overflow: 'hidden', // Prevents overflow from rounded corners
    backdropFilter: 'blur(50px)', // Adds background blur (web-only)
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,

    backgroundColor: ' rgba(0, 0, 0, 0.8)',

    /* Inner Shadow */
    boxShadow: 'inset 0 0 12px 1px rgba(0, 0, 0, 0.2)',
    minHeight: height * 0.46,
    maxHeight: height * 0.46,
  },
  modalHeader: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: 600,
    lineHeight: 18,
    LetterSpacing: 2,
    paddingBottom: 10,
    color: 'white',
    textAlign: 'center',
  },
  commentContainer: {
    marginBottom: 16,
    paddingBottom: 10,
  },
  commentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentDetails: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  commentTime: {
    fontSize: 14,
    color: '#aeaeae',
  },
  commentContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginTop: 8,
  },
  verticalLine: {
    width: 2,
    height: '100%',
    backgroundColor: '#fff',
    marginRight: 12,
  },
  commentText: {
    flex: 1,
    fontSize: 14,
    color: '#fff',
    marginLeft: 16,
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    color: 'white',
  },
  commentInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 2,
    width: 220,
    height: 48,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    margin: 10,
    marginRight: 0,
    color: 'white',
  },
  sendButton: {
    padding: 2,
    borderWidth: 2,
    width: 46,
    height: 48,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
};
