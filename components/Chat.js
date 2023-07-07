import { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

const Chat = ({ route, navigation, db }) => {
  const { name, backgroundColor, uid } = route.params; // gets name, colour and User ID from route.params
  const [messages, setMessages] = useState([]); // sets message state

  useEffect(() => {
    // set navigation options for the title
    navigation.setOptions({ title: name });

    // Create a query to get the messages collection ordered by createdAt in descending order
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));

    // Subscribe to the query snapshot in real time
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMessages);
    });

    // Clean up the subscription when the component unmounts
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000', // change the background color of the right side chat bubble to black
          },
          left: {
            backgroundColor: '#fff', // change the background color of the left side chat bubble to white
          },
        }}
        textStyle={{
          right: {
            color: '#fff', // change the text color of the right side chat to white
          },
          left: {
            color: '#000', // change the text color of the left side to black
          },
        }}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={onSend}
        user={{
          _id: uid,
          name: name,
        }}
        placeholder="Type a message..."
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null}
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
