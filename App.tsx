/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const catIcon = <MaterialCommunityIcons name={"cat"} size={128} />;
const searchingIcon = <MaterialCommunityIcons name={"map-marker-question-outline"} size={128} color={"green"} />;

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
const getRandomCatSoundInx = () => {
  return Math.floor(Math.random() * TOTAL_CAT_SOUNDS);
};
const randomStartingInx = getRandomCatSoundInx();

const App = () => {
  const [playing, setPlaying] = useState(false);
  // const [soundInx, setSoundInx] = useState(randomStartingInx);
  // console.log(soundInx);
  const [dynamicBackgroundColor, setX] = useState(new Animated.Value(0));
  const [dynamicCircle, _] = useState(new Animated.Value(0));
  // Animated.timing(dynamicCircle, {
  //   toValue: 1,
  //   duration: 500,
  //   easing: Easing.linear,
  //   useNativeDriver: false  // <-- neccessary
  // });

  useEffect(() => {
    ding.setVolume(1);
    return () => {
      ding.release();
    };
  }, []);

  let circleAnimationInterval;
  const play = () => {
    let currSound = catSounds[randomStartingInx];

    if (!playing) {
      setPlaying(true);
      Animated.spring(
        dynamicBackgroundColor,
        {

          toValue: 1, useNativeDriver: true,
          speed: 1,
          bounciness: 100,
        }
      ).start();
      // const toggleCircle;

      console.log("new circle");
      Animated.timing(
        dynamicCircle,
        {

          toValue: 100,
          useNativeDriver: true,
          // speed: 0.001,
          duration: 3000,

          // bounciness: 100,

        }
      ).start();
      
      setInterval(() => {

        Animated.timing(
          dynamicCircle,
          {

            toValue: 0,
            useNativeDriver: true,
            // speed: 0.001,
            duration: 1,

            // bounciness: 100,

          }
        ).start(() => {
          Animated.timing(
            dynamicCircle,
            {

              toValue: 100,
              useNativeDriver: true,
              // speed: 0.001,
              duration: 3000,

              // bounciness: 100,

            }
          ).start();
        });
      }, 5000);




      const cb = (success: any) => {

        if (success) {
          const nextInx = getRandomCatSoundInx();

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
      clearInterval(circleAnimationInterval);
      Animated.spring(
        dynamicBackgroundColor,
        {

          toValue: 0, useNativeDriver: true,
          speed: 1,
          bounciness: 100,
        }
      ).start();
      currSound.stop();
    }
  };

  const FoundedButton = <TouchableOpacity style={styles.playBtn} onPress={play}>
    {searchingIcon}
    <Text style={styles.textFound}>Touch if found!</Text>
  </TouchableOpacity>;

  const FindButton = <TouchableOpacity style={styles.playBtn} onPress={play}>
    {catIcon}
    <Text style={styles.text}>Touch to find cat</Text>
  </TouchableOpacity>;
  var color = dynamicBackgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 1)', 'rgba(0, 0, 0, 1)']
  });

  var bandth = dynamicCircle.interpolate({
    inputRange: [0, 10],
    outputRange: [1, 50]
  });

  return (
    // <View style={styles.container}>
    <Animated.View style={{ ...styles.container, backgroundColor: color }}>
      {playing ? FoundedButton : FindButton}
      <Animated.View style={{ zIndex: -1, borderRadius: 50, borderWidth: 2, backgroundColor: "transparent", borderColor: "green", width: 10, height: 10, transform: [{ scale: bandth }] }}></Animated.View>
      {/* </View> */}
    </Animated.View>
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
    textAlign: "center",
  },
  textFound: {
    color: "white",
    textAlign: "center"
  }
});
export default App;