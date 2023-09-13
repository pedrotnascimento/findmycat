import { getRandomCatSoundInx } from "./utils";

var Sound = require('react-native-sound');

Sound.setCategory('Playback');

export const catSounds: any[] = [];
export const TOTAL_CAT_SOUNDS = 18;
for (let i = 1; i <= TOTAL_CAT_SOUNDS; i++) {

    try {
        const cat = new Sound(`cat${i}.mp3`, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.error('failed to load the sound', i, error);
                return;
            }
        });
        catSounds.push(cat);
    }
    catch (e) {
        console.error('Exception on loading cat sound', i);
    }
}


export function getNextCatSound() {
    const nextInx = getRandomCatSoundInx(TOTAL_CAT_SOUNDS);
    const nextSound = catSounds[nextInx];


    return { nextInx, nextSound };
}