import { getRandomCatSoundInx } from "./utils";

var Sound = require('react-native-sound');

Sound.setCategory('Playback');

export const catSounds: any[] = [];
export const TOTAL_CAT_SOUNDS = 13;
for (let i = 1; i <= TOTAL_CAT_SOUNDS; i++) {
    const cat = new Sound(`cat${i}.mp3`, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.error('failed to load the sound', error);
            return;
        }
    });
    catSounds.push(cat);
}


export function getNextCatSound() {
    const nextInx = getRandomCatSoundInx(TOTAL_CAT_SOUNDS);
    const nextSound = catSounds[nextInx];
    
    
    return { nextInx, nextSound };
}