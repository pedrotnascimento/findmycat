/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

// import Ionicons from 'react-native-vector-icons/Ionicons';

var Sound = require('react-native-sound');


Sound.setCategory('Playback');


var ding = new Sound('mixkit_cartoon_kitty_begging_meow_92.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
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

  let interval;
  const play = () => {

    setPlaying(!playing);
    const playSound = ding.play;
    if (!playing) {
      setPlaying(true);
      const cb = (success: any) => {
        if (success) {
          console.log("playing", playing);
          ding.play(cb);
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      };
      // playSound(cb);
      ding.play(cb);
    }
    else {
      setPlaying(false);
      ding.stop();
    }


  };

  return (
    <View style={styles.container}>
      {playing ? <TouchableOpacity style={styles.playBtn} onPress={play}>
        <Text > "Touch if found!" </Text>
      </TouchableOpacity> :
        <TouchableOpacity style={styles.playBtn} onPress={play}>
          <Text > "Touch to find cat"</Text>
        </TouchableOpacity>}
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
    padding: 20,
  },
});
export default App;