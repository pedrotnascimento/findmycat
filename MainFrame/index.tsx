import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import { FoundedButton } from "../FoundedButton";
import { useState } from "react";
import { FindButton } from "../FindButton";
import { toggleFinding as toggleBackgroundFinding, toggleFound as toggleBackgroundFound } from "./backgroundAnimationLogic";
import { firstCircleIteration, circleClose, endCircleRoutine } from "./circleAnimationLogic";
import { TOTAL_CAT_SOUNDS, catSounds, getNextCatSound } from "./soundLogic";
import { getRandomCatSoundInx } from "./utils";
import { Trans } from "@lingui/macro";

const randomStartingInx = getRandomCatSoundInx(TOTAL_CAT_SOUNDS);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const randomCatX = getRandomCatSoundInx(windowWidth);
const randomCatY = getRandomCatSoundInx(windowHeight);

let circleAnimationInterval;

export const MainFrame = () => {
  const [playing, setPlaying] = useState(false);
  const [soundInx, setSoundInx] = useState(randomStartingInx);
  const [dynamicBackgroundColor, setDynamicBackgroundColor] = useState(new Animated.Value(0));
  const [dynamicCircle, setDynamicCircle] = useState(new Animated.Value(0));

  const [catX, setCatX] = useState(randomCatX);
  const [catY, setCatY] = useState(randomCatY);

  let currSound;
  const play = () => {
    if (!playing) {
      playRoutine();
    }
    else {
      pauseRoutine();
    }
  };


  function playRoutine() {
    currSound = catSounds[soundInx];
    setPlaying(true);

    toggleBackgroundFinding(dynamicBackgroundColor);
    startCircleRoutine();

    const getNextSound = (success: any) => {

      if (success) {
        currSound.stop();
        const { nextInx, nextSound } = getNextCatSound();
        currSound = nextSound;

        setSoundInx(nextInx);
        nextSound.play(getNextSound);
      } else {
        console.error('playback failed due to audio decoding errors');
      }
    };
    currSound.play(getNextSound);
  }

  function startCircleRoutine() {
    firstCircleIteration(dynamicCircle);

    circleAnimationInterval = setInterval(() => {
      setCatX(getRandomCatSoundInx(windowWidth));
      setCatY(getRandomCatSoundInx(windowHeight));

      circleClose(dynamicCircle);
    }, 5000);
  }

  function pauseRoutine() {
    endCircleRoutine(dynamicCircle, circleAnimationInterval);

    setPlaying(false);
    toggleBackgroundFound(dynamicBackgroundColor, () => {
    });

    currSound = catSounds[soundInx];
    currSound.stop();
  }

  var color = dynamicBackgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 1)', 'rgba(0, 0, 0, 1)']
  });

  return (
    <>
      <View style={{ backgroundColor: "#ff96c5", height: "10%", justifyContent: "center" }}>
        <Text style={{ textAlign: "center", textTransform: "uppercase", color: "white", fontWeight: "800" }}>
          <Trans>header_title</Trans>
        </Text>
      </View>
      <Animated.View style={{ ...styles.container, zIndex: 0, backgroundColor: color }}>
        {playing ? <FoundedButton dynamicCircle={dynamicCircle} play={play} catX={catX} catY={catY} /> : <FindButton play={play} />}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  }
});
