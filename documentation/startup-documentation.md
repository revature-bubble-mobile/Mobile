# Startup Guide for Bubble Mobile

## A React Native Mobile Application
---
## Github Repo
- [Link to the mobile front end for Bubble App](https://github.com/revature-bubble-mobile/Mobile)

## Requirements
---
1. Node.JS
2. Expo CLI
3. Mobile phone with Expo Mobile installed ***OR*** Android Studio Emulator

## Installations
---
1. Install Node Package Manager to your local machine
    ```
    npm install -g npm
    ```
2. Install Expo CLI to your local machine
    ```
    npm install -g expo-cli
    ```
3. Install Expo on mobile device from Google PlayStore on Android, or Apple AppStore on iOS (iOS version is named Expo Go)
    ### ***Required if you don't want to use the emulator installation below***
    #### Google Playstore Version:
    ![Google Playstore](doc-screenshots\expo_playstore1.png)
    #### Apple AppStore Version:
    ![Apple Appstore](doc-screenshots\expogo_appstore1.png)

4. Install Android Studio on Local Machine
    ### ***Required if you don't want to use Expo Mobile App installation above***
    - [Download Android Studio](https://developer.android.com/studio) from this link
    - Run the downloaded file and follow installation instructions

## How to use Expo CLI with Expo Mobile App (**Mobile Device and Local machine on same network**)
---
1. Open a terminal in either VScode or from the project directory
2. Start the app with either command:
    ```
    expo start
    ```
    or:
    ```
    npm start
    ```
3. After a short time you should see the following screen in your terminal window:
    
    ![Expo Terminal](doc-screenshots\expoterminal.png)

4. If your mobile device and local machine are on the same Network, you can simply select Scan QR Code from the mobile app. It is located under the projects tab.
    #### This is the fastest, easiest, and safest route as it just uses your LAN and connects through your router.
    ![Expo Mobile Screen](doc-screenshots\ExpoGo_MobileSCreen.jpg)

5. Your camera will open. Scan the QR code in the terminal and wait for the bundling to complete, and the app should open on your mobile device!

## How to use Expo CLI with Expo Mobile App (**Mobile Device and Local machine on different networks**)
---
1. Open a terminal in either VScode or from the project directory
2. Start the app with either command:
    ```
    expo start
    ```
    or:
    ```
    npm start
    ```
3. After a short time you should see the following screen in your terminal window:
    
    ![Expo Terminal](doc-screenshots\expoterminal.png)

4. Press the 'd' key.
5. This will open a window in your default browser that displays the developer tools:

    ![Expo DevTools](doc-screenshots\expo_devtools.png)

6. In the bottom left of the dev tools window where it says 'CONNECTION' click on the button that says Tunnel

7. Under the tunnel setting, your computer will setup a tunnel to exp.direct, a domain using the ngrok tunnel service. This means that all your traffic will go through a proxy in the cloud, but it can punch through most firewalls, etc., so it will work under most conditions.

8. Open the Expo App on your mobile device and select scan QR code from the projects tab
    
    ![Expo Mobile Screen](doc-screenshots\ExpoGo_MobileSCreen.jpg)

9. Scan the QR Code in the dev tools window with the Expo Mobile App and the application should open on the mobile device.
    - *This QR code can be scanned by others through a screenshare as well, as the connection is now public through ngrok*

## How to use Expo CLI with Android Studio Emulator
---
1. Open a terminal in either VScode or from the project directory
2. Start the app with either command:
    ```
    expo start
    ```
    or:
    ```
    npm start
    ```
3. After a short time you should see the following screen in your terminal window:
    
    ![Expo Terminal](doc-screenshots\expoterminal.png)

4. Press the 'd' key.
5. This will open a window in your default browser that displays the developer tools:
    
    ![Expo DevTools](doc-screenshots\expo_devtools.png)

6. Open Android Studio
7. Open your project in Android Studio
8. Open the ‘AVD manager’ from the Android Studio toolbar.
    #### *From Android Studio here is the open AVD Manager button:*

    ![Avd Manager](doc-screenshots\avdmanager.webp)

9. Run an Android emulator.
    #### *To run an Android Emulator, click the play symbol next to the one you want to use from the AVD Manager window:*

    ![Emulator Select](doc-screenshots\emulatorselect.webp)

10. Click ‘run on Android device/emulator‘ in the Expo devtools browser window.

    ![Expo DevTools](doc-screenshots\expo_devtools.png)