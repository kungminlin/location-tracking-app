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
#### Xcode Development
If you are developing this app on Xcode or would like to test on an iOS device via Xcode, follow these steps to install CocoaPods dependencies:
```bash
$ sudo gem install cocoapods
$ cd app/ios
$ pod install
```
### 2. Starting Metro Server
```bash
npx react-native start
```
The Metro server enables hot reloading and debugging with your testing devices without tethering.
### 3. Configuring Testing Devices
#### Android Emulator
1. Install [Android Studio](https://developer.android.com/studio/install).
2. Create virtual devices via the AVD Manager.
3. Run `npx react-native run-android` in `/app`.
#### Android Physical Device
1. Install [Android Studio](https://developer.android.com/studio/install).
2. Tap `Settings > About phone > Build number` seven times. After a few taps, you should see steps counting down until you unlock developer options. The location of this option may vary depending on the vendor, but it will be in this general area.
3. Connect your device to your PC via a USB cable. You should be prompted to enable USB debugging on your device.
4. Use the `adb` tool under the platform-tools Android SDK tools. You can find this in the application data directory of your Android Studio software. Run `adb devices` to see if your device is properly connected. This command can also be used to check if virtual devices are connected.
5. Run `npx react-native run-android` in `/app`
#### iOS Emulator
1. Install Xcode via App Store.
2. Under the `Window` menu, select the `Devices` option.
3. Click on the `+` sign at the bottom of the popup window and `Add Simulator`. Choose your desired configurations for the iOS emulator.
4. Run `npx react-native run-ios` in `/app`.
#### iOS Physical Device
1. Install Xcode via App Store.
2. Open project in Xcode.
3. Connect iOS device via USB cable.
4. If this is your first time testing on this iOS device, register your device in the `Product > Destination` option.
5. In your project in Xcode, go to `General > Signing` and make sure your Apple developer account is selected. If you do not have a developer account, register for one and select it here.
6. Repeat **Step 5** for the Tests target
7. Your device should be listed as the build target in the Xcode toolbar. Press the `Build and run` button (`⌘-R`) to run your app.
### 4. Debugging
After running `npx react-native start`, outputs should be logged in the same console. Hot reload is enabled automatically, and you can shake your device (Android or iOS) to open the Developer menu. You can also enable/disable hot reload in this menu.
### 5. Troubleshooting
Here are a few commonly encountered errors:
1. **Xcode fails to build.** In this case, you might have run the `.xcodeproj` file instead of the `.xcworkspace` file. Running the `.xcworkspace` file should solve the issue.
2. **Metro fails to run with Xcode; Shows the error "too many files".** OSX often comes with maximum file restrictions. If you are running on OS X Sierra or above, running the following commands should solve the issue:
    * `sudo sysctl -w kern.maxfiles=5242880`
    * `sudo sysctl -w kern.maxfilesperproc=524288`
    * Restart your computer. If your computer is still having issues or runs slowly, rerun the above commands with suitable parameters or search up the appropriate alternative for your version of OSX.
    * Additionally, you may install watchman via `brew install watchman` to allow more files to be watched, resolving this issue.
3. **SDK "iphoneos" cannot be located.** Most likely, your Xcode is installed in the Applications folder. If that is so, simply run `sudo xcode-select --switch /Applications/Xcode.app`