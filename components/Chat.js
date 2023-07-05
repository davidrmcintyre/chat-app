import { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params; // gets name and colour from route.params
  const [messages, setMessages] = useState([]); // sets message state
   
    useEffect(() => {
    navigation.setOptions({ title: name });
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
        sent: true, // Mark the message as sent, using one tick
        received: true, // Mark the message as received, using two ticks
        pending: true, // Mark the message as pending with a clock loader
      },
      {
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

    // Accesses latest state value
    const onSend = (newMessages) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))} 

    const renderBubble = (props) => {
    return <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: '#000' // change the background color of the right side chat bubble to black
                },
                left: {
                    backgroundColor: '#fff' // change the background color of the left side chat bubble to white
                }
            }}
            textStyle={{
              right: {
                color: '#fff' //change the text color of the right side chat to white
              },
              left: {
                color: '#000' // change the text color of the left side to black
              }
            }}
        />
        }

    return (
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1
      }}
      placeholder="Type a message..."
      />
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      {Platform.OS === "ios"?<KeyboardAvoidingView behavior="padding" />: null}
      </View>
    );
}




//styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;