# Chat App

This repository contains the code for a simple chat app built using React Native and React Navigation. The app allows users to enter their username, choose a background color, and start chatting.

## Components

1. **Start**: This component is responsible for the initial screen of the chat application where the user can enter their username and choose a background color. It utilizes the useState hook to manage the state of the input fields and background color. The component also handles anonymous user sign-in using Firebase authentication.

2. **Chat**: This component represents the main chat screen of the application. It uses the GiftedChat component from the react-native-gifted-chat library to render and manage the chat messages. The component utilizes Firebase Firestore for real-time message synchronization and storage. It also includes custom actions for image and location sharing using Expo libraries.

3. **CustomActions**: This component provides custom actions for image and location sharing in the chat. It uses the @expo/react-native-action-sheet library for displaying an action sheet with options for choosing an image from the library, taking a picture, or sending the user's current location. The selected image or location is then uploaded to Firebase Storage and sent as a message.

## Installation

To run the app locally, follow these steps:

1. Clone the repository:


2. Install the dependencies:


3. Start the Metro server:


4. Run the app on a connected device or emulator:


Dependencies:
- **@react-navigation/native**: React Navigation library for screen navigation within the application.
- **@react-navigation/native-stack**: Native stack navigator for React Navigation.
- **@react-native-community/netinfo**: NetInfo library for detecting the network connection status.
- **firebase**: Firebase SDK for initializing Firebase app and Firestore.
- **react-native**: React Native framework for building mobile applications.
- **react-native-gifted-chat**: GiftedChat library for rendering chat UI and managing messages.
- **react-native-maps**: React Native Maps library for displaying a map view for location sharing.
- **expo-image-picker**: Expo library for accessing and selecting images from the device's gallery or camera.
- **expo-location**: Expo library for retrieving the user's current location.


Make sure to install these dependencies before running the app.

## Installation & Usage

To use these code fragments in your own React Native project:

- Install the required dependencies mentioned above.
- Create the necessary Firebase project and configure it with your own Firebase credentials.
- Copy the code fragments into their respective files in your project.
- Adjust the imports and dependencies according to your project's structure.
- Use the components and functions as needed in your application's screens and components.

Make sure to review and customize the code to fit your specific requirements and follow best practices for React Native and Firebase development.

## License

This project is licensed under the [MIT License](LICENSE).
