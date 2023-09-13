
## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```
**repository** for React Native.

# Testing in devices:
- if it doesn't have a key store use this to generate:
> keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000                

- Run: 
> npm run buildApkTest

## Or step by step:
- Create a bundle going from root:
> android\gradlew bundleRelease

- Turn the .aab file into a .apks file:
> java -jar bundletool-all-1.15.4.jar build-apks --bundle="C:\repo\react-native apps\find-my-cat\android\app\build\outputs\bundle\release\app-release.aab" --output="encontre_meu_gato.apks" --ks=app\my-upload-key.keystore --ks-key-alias="my-key-alias" --mode=universal

- Extract the .apks file, for example renaming to .zip and extracting:
- Into the folder Copy and Send the universal.apk file to the device and install it.

Source:
https://www.alura.com.br/artigos/react-native-gerando-apk-ipa

# Next Features:

- different modes [ ]
   - bird mode [ ]
   - cat food sound [ ]
   - pssss sound [ ]
- about session with donate to the cat [ ]
- apply google ads [ ]
- improve font family and style [ ]
- gif and video in the readme [ ]


# Done:
- cleaned the code [V]
- internationalization [V]
- get a lot of cat sounds that may attract the cats [V]
- set a dark background like a submarine sonar when the app its trying to find the cat [V]
- create a cat shape button to active the cat sounds  [V]
   - Icon with the shape of the cat
   - when the app is trying to find the cat, the shape goes dark and outlined green, like a sonar sub  [V]
