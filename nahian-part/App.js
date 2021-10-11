import React, {useEffect, useState, useRef} from 'react';
//import type {Node} from 'react';
import {
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';
import {LogBox} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import {
  usePlaybackState,
  useTrackPlayerProgress,
  TrackPlayerEvents,
} from 'react-native-track-player';
import TrackPlayer from 'react-native-track-player';
import {PLAYBACK_TRACK_CHANGED} from 'react-native-track-player';
import songs from './songs';

LogBox.ignoreAllLogs(); //Ignore all log notifications
const Dev_Height = Dimensions.get('window').height;
const Dev_Width = Dimensions.get('window').width;

function App() {
  const slider = useRef(null);
  const isPlayerReady = useRef(false);
  const index = useRef(0);
  const isItFromUser = useRef(true);
  const scrollX = useRef(new Animated.Value(0)).current;
  const playbackState = usePlaybackState();
  const isPlaying = useRef('paused'); //paused play loading

  const [songIndex, setSongIndex] = useState(0);
  const {position, duration} = useTrackPlayerProgress(1000, null);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seek, setSeek] = useState(0);
  const pos = useRef(Animated.divide(scrollX, Dev_Width)).current;

  const formatTime = secs => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  };

  const TRACK_PLAYER_CONTROLS_OPTS = {
    waitforBuffer: true,
    stopWithApp: false,
    alwaysPauseOnInterruption: true,
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      TrackPlayer.CAPABILITY_SEEK_TO,
    ],
    compactCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    ],
  };

  useEffect(() => {
    console.log('Player State: ', playbackState);

    //set the player state
    if (playbackState === 'playing' || playbackState === 3) {
      isPlaying.current = 'playing';
    } else if (playbackState === 'paused' || playbackState === 2) {
      isPlaying.current = 'paused';
    } else {
      isPlaying.current = 'loading';
    }
    console.log('hoise 1', playbackState);
  }, [playbackState]);

  useEffect(() => {
    if (isPlayerReady.current && isItFromUser.current) {
      TrackPlayer.skip(songs[songIndex].id)
        .then(_ => {
          console.log('changed track');
        })
        .catch(e => console.log('error in changing track ', e));
    }
    index.current = songIndex;
    console.log('hoise 2', playbackState);
  }, [songIndex]);

  useEffect(() => {
    // position.addListener(({ value }) => {
    //   console.log(value);
    // });

    scrollX.addListener(({value}) => {
      const val = Math.round(value / Dev_Width);

      setSongIndex(val);
    });

    TrackPlayer.setupPlayer().then(async () => {
      // The player is ready to be used
      console.log('Player ready');
      // add the array of songs in the playlist
      await TrackPlayer.reset();
      await TrackPlayer.add(songs);
      TrackPlayer.play();
      isPlayerReady.current = true;

      await TrackPlayer.updateOptions(TRACK_PLAYER_CONTROLS_OPTS);

      //add listener on track change
      TrackPlayer.addEventListener(PLAYBACK_TRACK_CHANGED, async e => {
        console.log('song ended', e);

        const trackId = (await TrackPlayer.getCurrentTrack()) - 1; //get the current id

        console.log('track id', trackId, 'index', index.current);

        if (trackId !== index.current) {
          setSongIndex(trackId);
          isItFromUser.current = false;

          if (trackId > index.current) {
            goNext();
          } else {
            goPrv();
          }
          setTimeout(() => {
            isItFromUser.current = true;
          }, 200);
        }

        // isPlayerReady.current = true;
      });

      // monitor intterupt when other apps start playing music
      TrackPlayer.addEventListener(TrackPlayerEvents.REMOTE_DUCK, e => {
        // console.log(e);
        if (e.paused) {
          // if pause true we need to pause the music
          TrackPlayer.pause();
        } else {
          TrackPlayer.play();
        }
      });
    });

    return () => {
      scrollX.removeAllListeners();
      TrackPlayer.destroy();

      // exitPlayer();
    };
  }, [scrollX]);

  const returnPlayBtn = () => {
    switch (isPlaying.current) {
      case 'playing':
        return <AntDesign color="#de300d" name="pausecircle" size={45} />;
      case 'paused':
        return <AntDesign color="#f4511e" name="play" size={45} />;
      default:
        return <ActivityIndicator size={45} color="#fff" />;
    }
  };

  const onPlayPause = () => {
    if (isPlaying.current === 'playing') {
      TrackPlayer.pause();
    } else if (isPlaying.current === 'paused') {
      TrackPlayer.play();
    }
  };

  const handleChange = val => {
    TrackPlayer.seekTo(val);
    TrackPlayer.play().then(() => {
      setTimeout(() => {
        setIsSeeking(false);
      }, 1000);
    });
  };

  const onNext = async () => {
    slider.current.scrollToOffset({
      offset: (index.current + 1) * Dev_Width,
    });

    await TrackPlayer.play();
  };
  const onPrv = async () => {
    slider.current.scrollToOffset({
      offset: (index.current - 1) * Dev_Width,
    });

    await TrackPlayer.play();
  };

  const renderItem = ({index, item}) => {
    return (
      <Animated.View
        style={{
          alignItems: 'center',
          width: Dev_Width,
          height: Dev_Height,
          transform: [
            {
              translateX: Animated.multiply(Animated.add(pos, -index), -100),
            },
          ],
        }}>
        <View style={styles.mainbar}>
          <Text style={styles.now_playing_text}> Now Playing </Text>
        </View>
        <View style={styles.music_logo_view}>
          <Animated.Image
            source={require('./assets/THn0.gif')}
            style={styles.image_view}
          />
        </View>
        <View style={styles.name_of_song_View}>
          <View>
            <Text style={styles.title}>{songs[songIndex].title}</Text>
            <Text style={styles.artist}>{songs[songIndex].artist}</Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.contanier}>
      <SafeAreaView style={{height: 360}}>
        <Animated.FlatList
          ref={slider}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          data={songs}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
        />
      </SafeAreaView>

      <View style={styles.slider_view}>
        <Slider
          style={styles.slider_style}
          minimumValue={0}
          value={isSeeking ? seek : position}
          onValueChange={value => {
            TrackPlayer.pause();
            setIsSeeking(true);
            setSeek(value);
          }}
          maximumValue={duration}
          minimumTrackTintColor="#ffffff"
          onSlidingComplete={handleChange}
          minimumTrackTintColor="#f4511e"
          maximumTrackTintColor="#e0bbaf"
          thumbTintColor="#e63e09"
        />
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.timers}>
          {formatTime(isSeeking ? seek : position)}
        </Text>
        <Text style={styles.timers}>{formatTime(duration)}</Text>
      </View>

      <View style={styles.functions_view}>
        <Ionicons
          onPress={onPrv}
          name="play-back-circle"
          size={46}
          color="#f4511e"
          style={{marginLeft: '20%'}}
        />
        <AntDesign
          onPress={onPlayPause}
          size={50}
          color="#f4511e"
          style={{marginLeft: '12%'}}>
          {returnPlayBtn()}
        </AntDesign>
        <Ionicons
          onPress={onNext}
          name="play-forward-circle"
          size={46}
          color="#f4511e"
          style={{marginLeft: '12%'}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contanier: {
    backgroundColor: 'black',
    height: Dev_Height,
    width: Dev_Width,
  },
  mainbar: {
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  now_playing_text: {
    fontSize: 19,
    marginLeft: '36%',
    color: 'grey',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '600',
    textTransform: 'capitalize',
    color: '#ffffff',
  },
  artist: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ffffff',
    textTransform: 'capitalize',
  },
  music_logo_view: {
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image_view: {
    height: '100%',
    width: '50%',
    borderRadius: 10,
  },
  name_of_song_View: {
    height: '15%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider_view: {
    height: '10%',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: '2%',
    marginTop: '-10%',
  },
  slider_style: {
    height: '70%',
    width: '76%',
    marginLeft: '11%',
    marginBottom: '-10%',
  },
  functions_view: {
    flexDirection: 'row',
    height: '10%',
    width: '100%',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '17%',
    paddingRight: '17%',
    marginBottom: '2%',
  },
  timers: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;
