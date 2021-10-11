import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Platform, Button, TouchableOpacity,Image } from 'react-native';
import Video from 'react-native-video';
import { PLAYER_STATES } from 'react-native-media-controls';
import Slider from '@react-native-community/slider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';

const MusicPlayerScreen1 = ({navigation,route}) => {

    const videoPlayer = useRef(null);
    const [duration, setDuration] = useState(0.0);
    const [paused, setPaused] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const handleTest = () => {

        console.log('kichu na');

    }

    const formatTime = secs => {
        let minutes = Math.floor(secs / 60);
        let seconds = Math.ceil(secs - minutes * 60);

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    };

    const onProgress = (data) => {
        if (!isLoading) {
            setCurrentTime(data.currentTime);
        }
    };

    const onLoad = (data) => {
        console.log('inside onLoad ' + Math.round(data.duration));
        setDuration(Math.round(data.duration));
        setIsLoading(false);
    };

    const onLoadStart = () => setIsLoading(true);

    const handlePrev5sec = () => {
        videoPlayer.current.seek(currentTime - 5)
    }

    const handleNext5sec = () => {
        videoPlayer.current.seek(currentTime + 5)
    }

    const handlePlayPause = () => {

        if (paused == true) {
            setPaused(false);
        } else if (paused == false) {
            setPaused(true);
        }

    }

    const returnPlayPauseBtn = () => {

        if (paused == true) {
            return <AntDesign color="#f4511e" name="play" size={45} />;
        } else if (paused == false) {
            return <AntDesign color="#de300d" name="pausecircle" size={45} />;
        }

    }

    const handleChat = () => {
        navigation.navigate('Chat',{
            user_info:route.params.user_info,
            id:route.params.id,
        })
    } 

    return (
        <View style={{
            flexGrow: 1,
            justifyContent: 'center',
            backgroundColor: 'black',
        }}>
            <View
                style={{
                    alignItems: 'center',
                    marginBottom: 15,
                }}
            >
                {isLoading ?
                    <Avatar.Image
                        size={50}
                        source={{
                            uri: 'https://firebasestorage.googleapis.com/v0/b/onemoretime-bfcd9.appspot.com/o/loading.gif?alt=media&token=c4b70597-6ea4-4b20-b61b-726c937a223b'
                        }}
                        style={{
                            backgroundColor: 'black',
                        }}
                    />
                    :
                    <Text
                        style={{
                            fontSize: 19,
                            color: 'grey',
                        }}
                    >Now Playing...</Text>}
            </View>
            <View
                style={{
                    alignItems:'center',
                }}
            >
                <Image
                    style={{
                        width:180,
                        height:220,
                        flexGrow:0,
                    }}
                    source={{
                        uri:'https://firebasestorage.googleapis.com/v0/b/onemoretime-bfcd9.appspot.com/o/THn0.gif?alt=media&token=8f6b31dc-3e62-4850-b4a0-45820f7a5655'
                    }}
                />
            </View>
            <Video
                onLoad={onLoad}
                onLoadStart={onLoadStart}
                posterResizeMode={'cover'}
                onProgress={onProgress}
                paused={paused}
                ref={(ref) => (videoPlayer.current = ref)}
                resizeMode={'cover'}
                source={{ uri: route.params.url}}
                style={{
                    height: 0,
                    width: 0,
                }}
                fullscreen={false}
                repeat={true}
                muted={false}
            />
            <View
                style={{
                    justifyContent: 'space-around',
                    margin: 15,
                }}
            >
                <Text
                    style={{
                        fontSize: 28,
                        textAlign: 'center',
                        fontWeight: '600',
                        textTransform: 'capitalize',
                        color: '#ffffff',
                    }}
                >{route.params.title}</Text>
                <Text
                    style={{
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#ffffff',
                        textTransform: 'capitalize',
                    }}
                >{route.params.artist}</Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                }}
            >
                <Ionicons
                    onPress={() => handlePrev5sec()}
                    name="play-back-circle"
                    size={46}
                    color="#f4511e"
                    style={{ marginLeft: '20%' }}
                />
                <AntDesign
                    onPress={() => handlePlayPause()}
                    size={50}
                    color="#f4511e"
                    style={{ marginLeft: '12%' }}>
                    {returnPlayPauseBtn()}
                </AntDesign>
                <Ionicons
                    onPress={() => handleNext5sec()}
                    name="play-forward-circle"
                    size={46}
                    color="#f4511e"
                    style={{ marginLeft: '12%' }}
                />
            </View>
            <Slider
                value={currentTime}
                maximumValue={duration}
                thumbTintColor="#f4511e"
                maximumTrackTintColor="#f4511e"
                minimumTrackTintColor="#f4511e"
                style={{
                    margin: 10,
                }}
            />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    marginLeft: 16,
                    marginRight: 16,
                }}
            >
                <Text
                    style={{
                        color: '#fff',
                        fontSize: 16,
                    }}
                >{formatTime(currentTime)}</Text>
                <Text
                    style={{
                        color: '#fff',
                        fontSize: 16,
                    }}
                >{formatTime(duration)}</Text>
            </View>
            <TouchableOpacity
                onPress={() => handleChat()}
                style={{
                    alignItems:'center',
                }}
            >
                <View
                    style={{
                        borderColor: '#f4511e',
                        borderWidth:2,
                        borderRadius: 50,
                        alignItems: 'center',
                        margin: 10,
                        padding: 10,
                        flexDirection:'row',
                    }}
                >
                    <AntDesign
                        name='wechat'
                        size={50}
                        color='#f4511e'
                    />
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 25,
                            fontWeight: 'bold',
                            marginLeft:15,
                            marginRight:10,
                        }}
                    >Chat</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

}

export default MusicPlayerScreen1;
