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

const App = () => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    ding.setVolume(1);
    return () => {
      ding.release();
    };
  }, []);


  const play = () => {
    if (!playing) {
      setPlaying(true);
      const cb = (success: any) => {
        if (success) {
          ding.play(cb);
        } else {
          console.error('playback failed due to audio decoding errors');
        }
      };
      ding.play(cb);
    }
    else {
      setPlaying(false);
      ding.stop();
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