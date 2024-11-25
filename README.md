# NovelApp

A React Native app for writing novels, supporting both Android and iOS platforms. The app allows users to create and organize novels, add and manage paragraphs, mark chapters, display word count, and export the novel as a Word document. The app uses a local SQLite database for storage.

## Setting up the development environment

1. Clone the repository:
   ```sh
   git clone https://github.com/edg3/NovelReact.git
   cd NovelReact
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Install `react-navigation` and its dependencies:
   ```sh
   npm install @react-navigation/native
   npm install @react-navigation/stack
   npm install react-native-screens react-native-safe-area-context
   ```

4. Set up the Android development environment by following the official React Native documentation: [Setting up the development environment](https://reactnative.dev/docs/environment-setup)

## Running the app on an Android emulator

1. Open Android Studio and go to the "AVD Manager" (Android Virtual Device Manager) to create a new virtual device.

2. Select a device definition and a system image for the virtual device. Make sure to choose a system image that matches the target API level of your React Native app.

3. Once the virtual device is created, start the emulator by clicking the "Play" button next to the device in the AVD Manager.

4. Open a terminal and navigate to the root directory of your React Native project.

5. Start the Metro bundler by running the following command:
   ```sh
   npx react-native start
   ```

6. In a new terminal window, run the following command to build and launch the app on the Android emulator:
   ```sh
   npx react-native run-android
   ```

## Building a signed APK

1. Generate a signing key using the `keytool` command:
   ```sh
   keytool -genkey -v -keystore my-release-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
   ```
   This will prompt you to enter some information and create a `my-release-key.keystore` file.

2. Place the `my-release-key.keystore` file in the `android/app` directory of your project.

3. Edit the `android/gradle.properties` file to include the following lines:
   ```properties
   MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
   MYAPP_RELEASE_KEY_ALIAS=my-key-alias
   MYAPP_RELEASE_STORE_PASSWORD=your-store-password
   MYAPP_RELEASE_KEY_PASSWORD=your-key-password
   ```

4. Edit the `android/app/build.gradle` file to add the signing configuration:
   ```groovy
   android {
       ...
       signingConfigs {
           release {
               storeFile file(MYAPP_RELEASE_STORE_FILE)
               storePassword MYAPP_RELEASE_STORE_PASSWORD
               keyAlias MYAPP_RELEASE_KEY_ALIAS
               keyPassword MYAPP_RELEASE_KEY_PASSWORD
           }
       }
       buildTypes {
           release {
               ...
               signingConfig signingConfigs.release
           }
       }
   }
   ```

5. Compile the app to a signed APK by running the following command:
   ```sh
   cd android
   ./gradlew assembleRelease
   ```

6. The signed APK will be generated in the `android/app/build/outputs/apk/release` directory. You can transfer this APK to your phone and install it for testing.
