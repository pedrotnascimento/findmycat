/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const catIcon = <MaterialCommunityIcons name={"cat"} size={128} />;
const searchingIcon = <MaterialCommunityIcons name={"map-marker-question-outline"} size={128} />;

var Sound = require('react-native-sound');

Sound.setCategory('Playback');

var ding = new Sound('mixkit_cartoon_kitty_begging_meow_92.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  console.log('duration in seconds: ' + ding.getDuration() + 'number of channels: ' + ding.getNumberOfChannels());
});

const catSounds: any[] = [];
const TOTAL_CAT_SOUNDS = 13;
for (let i = 1; i <= TOTAL_CAT_SOUNDS; i++) {
  const cat = new Sound(`cat${i}.mp3`, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    console.log('duration in seconds: ' + ding.getDuration() + 'number of channels: ' + ding.getNumberOfChannels());
  });
  catSounds.push(cat);

}
const getRandomCatSoundInx = ()=>{
  return Math.floor(Math.random()*TOTAL_CAT_SOUNDS);
}
const randomStartingInx = getRandomCatSoundInx();

const App = () => {
  const [playing, setPlaying] = useState(false);
  const [soundInx, setSoundInx] = useState(randomStartingInx);
 console.log(soundInx);
  useEffect(() => {
    ding.setVolume(1);
    return () => {
      ding.release();
    };
  }, []);


  const play = () => {
    let currSound = catSounds[soundInx];
    
    if (!playing) {
      setPlaying(true);
      const cb = (success: any) => {

        if (success) {
          const nextInx =getRandomCatSoundInx();
          
          const nextSound = catSounds[nextInx];
          currSound = nextSound;
          nextSound.play(cb);
        } else {
          console.error('playback failed due to audio decoding errors');
        }
      };
      currSound.play(cb);
    }
    else {
      setPlaying(false);
      currSound.stop();
    }
  };

  const FoundedButton = <TouchableOpacity style={styles.playBtn} onPress={play}>
    {searchingIcon}
    <Text style={styles.text}>Touch if found!</Text>
  </TouchableOpacity>;

  const FindButton = <TouchableOpacity style={styles.playBtn} onPress={play}>
    {catIcon}
    <Text style={styles.text}>Touch to find cat</Text>
  </TouchableOpacity>;

  return (
    <View style={styles.container}>
      {playing ? FoundedButton : FindButton}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  playBtn: {
    // padding: 20,
  },
  text: {
    textAlign: "center"
  }
});
export default App;