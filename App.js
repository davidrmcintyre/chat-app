// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Initialize Firebase and Firestore
import { initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';

// Import useNetInfo
import { useNetInfo }from '@react-native-community/netinfo';

// Import useEffect
import { useEffect } from "react";

// Import Logbox and Alert
import { LogBox, Alert } from "react-native";

// Create the navigator
const Stack = createNativeStackNavigator();

// The app's main Chat component that renders the chat UI
const App = () => {
  const connectionStatus = useNetInfo();

  // Firebase config
  const firebaseConfig = {
    apiKey: 'AIzaSyC8O4l6UdFVG89vBvUV4a1jNWrGIE67b0g',
    authDomain: 'chat-app-3ce47.firebaseapp.com',
    projectId: 'chat-app-3ce47',
    storageBucket: 'chat-app-3ce47.appspot.com',
    messagingSenderId: '546611553829',
    appId: '1:546611553829:web:3fc7a14c6a23f777ee41cc',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection lost!'); // Alerts the user when the connection is lost
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen
          name='Welcome'
          component={Start}
        />
        <Stack.Screen name='Chat'>
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
