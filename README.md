# location-tracking-app
## Functionality
1. Tracks device location using built-in location tracking libraries in iOS and Android. Sends location information per meter of detected travel distance.
2. Checks if the device's location is within or outside of a specified territory.
3. If the device enters the territory, the device information will be sent to a server and the user will be notified.
4. If the device exits the territory, a message will be sent to a server and the user will be notified.
## Setting Up
### Prerequisites
* NodeJS
* Android Studio (for Android testing)
* Xcode (for iOS testing)
### 1. Installing Dependencies
```bash
cd app
npm install
```
### 2. Testing
```bash
npx react-native start
npx react-native run-android # for Android testing
npx react-native run-ios # for iOS testing
```
Note: `npx react-native start` is not necessary, but highly recommended to view realtime logs and feedback from the app.

For testing with different hardware and operating systems, you can configure virtual devices via Android Studio or Xcode. Both developer libraries offer connection with physical devices via USB tethering.
