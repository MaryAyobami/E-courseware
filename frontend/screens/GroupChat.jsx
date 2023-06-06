import { StyleSheet, Text, View } from 'react-native'
// import { WebView } from 'react-native-webview'; 
import React,{useEffect,useState} from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Channel as ChannelType, StreamChat } from 'stream-chat';
import {
  Channel,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  MessageType,
  OverlayProvider,
  Thread,
} from 'stream-chat-react-native';

const client = StreamChat.getInstance('ps7e8bkgwsdh');

const GroupChat = async() => {

  const [channel, setChannel] = useState();
  const [clientReady, setClientReady] = useState(false)
  const [thread, setThread] = useState();

  useEffect(() => {
    const setupClient = async () => {
      try {
        await client.connectUser(
          {
            id: 'jlahey',
            name: 'Jim Lahey',
            image: 'https://i.imgur.com/fR9Jz14.png',
          },
          'user_token',
        );
        setClientReady(true);
      } catch (e) {
        console.log(e);
      }
    };

    setupClient();
  }, []);

  const onBackPress = () => {
    if (thread) {
      setThread(undefined);
    } else if (channel) {
      setChannel(undefined);
    }
  };

  if (!clientReady) return null;
 

await channel.create();
  return (

     <OverlayProvider topInset={60}>
      <TouchableOpacity onPress={onBackPress} disabled={!channel}>
        <View style={{ height: 60, paddingLeft: 16, paddingTop: 40 }}>{channel && <Text>Back</Text>}</View>
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <Chat client={client}>
          {channel ? (
            <Channel channel={channel} keyboardVerticalOffset={60} thread={thread} threadList={!!thread}>
              {thread ? (
                <Thread />
              ) : (
                <>
                  <MessageList onThreadSelect={setThread} />
                  <MessageInput />
                </>
              )}
            </Channel>
          ) : (
            <ChannelList onSelect={setChannel} />
          )}
        </Chat>
      </View>
    </OverlayProvider>
  
   
  )
}

export default GroupChat

const styles = StyleSheet.create({})