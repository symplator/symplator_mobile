# symplator_mobile

This is a React Native app integrated with Realm Sync.

## Prerequisites

- Node.js (https://nodejs.org)
- MongoDB Realm Account (https://realm.mongodb.com)

## Installation

1. Clone the repository or download the project files.
2. Open a terminal or command prompt and navigate to the project directory.
3. Install the dependencies by running the following command:
   ```shell
   npm install

## Configuration

1. Create a Realm Application:

 - Visit the MongoDB Realm website (https://realm.mongodb.com) and sign in or create a new account.
 - Follow the instructions provided in the documentation to create a new Realm application.

2. Configure Realm Sync:

 - Rename env.dist as env in the project's root directory.
 - Change variables with your actual Realm application values.

## Usage

1. Start the React Native packager

   npx react-native start

2. Run the app on a device or simulator:

  - For Android:
   npx react-native run-android
 
  - For iOS:
   npx react-native run-ios

3. Follow the instructions on the device or simulator to launch the app.
 
## Create Debug APK 

1) Create bundle

npx react-native bundle 
   --platform android 
   --dev false 
   --entry-file index.js 
   --bundle-output android/app/src/main/assets/index.android.bundle 
   --assets-dest android/app/src/main/res

2) Build the Debug APK

   cd android
   ./gradlew assembleDebug

3) APK location 
   
   android/app/build/outputs/apk/debug/app-debug.apk
