import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Video from 'react-native-video';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faShareAlt,
  faVolumeUp,
  faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';

const {height, width} = Dimensions.get('window');

const VideoCard = ({video, autoPlay, onVideoEnd}) => {
  const [paused, setPaused] = useState(!autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seek(0);
    }
  }, [autoPlay]);

  const handleTogglePlayback = () => {
    setPaused(!paused);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.cardContainer}
      onPress={handleTogglePlayback}>
      {/* Rounded Video Wrapper */}
      <View style={styles.videoWrapper}>
        <Video
          ref={videoRef}
          source={{uri: video.videoUrl}}
          style={styles.videoBackground}
          resizeMode="cover"
          paused={paused}
          repeat={false}
          muted={isMuted}
          controls={false}
          onEnd={onVideoEnd}
        />
      </View>

      {/* Content Overlay */}
      <View style={styles.contentOverlay}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{video.title}</Text>
          <Text style={styles.subtitle}>
            By {video.source}, {video.time}
          </Text>
        </View>

        {/* Icons with Toggle Controls */}
        <View style={styles.iconContainer}>
          <Pressable onPress={handleToggleMute} style={styles.iconWrapper}>
            <FontAwesomeIcon
              icon={isMuted ? faVolumeMute : faVolumeUp}
              size={24}
              color="white"
            />
          </Pressable>

          <TouchableOpacity style={styles.iconWrapper}>
            <FontAwesomeIcon icon={faShareAlt} size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Consistent Rounded Video
  videoWrapper: {
    width: '92%', // Margin effect
    height: '87%', // Same height for all cards
    borderRadius: 30, // Rounded corners
    overflow: 'hidden', // Keeps the video inside rounded borders

    marginBottom: 20,
  },

  videoBackground: {
    width: '100%',
    height: '100%',
  },

  contentOverlay: {
    position: 'absolute',
    bottom: '8%',
    left: 16,
    right: 25,
    width: '92%',
    height: '10%',
    paddingHorizontal: 20,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },

  subtitle: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
    fontStyle: 'italic',
  },

  iconContainer: {
    gap: 20,
    bottom: 20,
  },

  iconWrapper: {
    padding: 12,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    elevation: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});

export default VideoCard;
