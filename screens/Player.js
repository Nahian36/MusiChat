import React from 'react';
import {View,Button,Text} from 'react-native';
import SoundPlayer from 'react-native-sound-player';



const Player = () => {

    const handlePlay = () => {
        
        try {
            // play the file tone.mp3
            // or play from url
            SoundPlayer.loadUrl('https://firebasestorage.googleapis.com/v0/b/fir-demo-825c4.appspot.com/o/10.mp3?alt=media&token=7197a393-520f-4c5a-a771-6063c63a6a0b')
        } catch (e) {
            console.log(`cannot play the sound file`, e)
        }

    }

    const handlePause = () => {
        SoundPlayer.pause();
    }

    return (
        <View>
            <Button title="play" onPress={handlePlay}/>
            <Button title="pause" onPress={handlePause}/>
        </View>

    )
}

export default Player;