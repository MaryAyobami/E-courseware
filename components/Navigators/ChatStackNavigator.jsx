import { StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import GroupChat from '../../screens/ChatStack/GroupChat';
import { useChatClient } from '../useChatClient';
import { useAppContext } from '../context/AppContext';

import {
  Chat,
  OverlayProvider,
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
} from 'stream-chat-react-native'; 

import { StreamChat } from 'stream-chat';
import { chatApiKey, chatUserId } from '../chatConfig';

const Stack = createStackNavigator();

const HomeScreen = () => <Text>Home Screen</Text>;


const filters = {
    members: {
      '$in': [chatUserId]
    },
  };
  
const sort = {
    last_message_at: -1,
};

const ChannelScreen = props => {
    const { channel } = useAppContext();
    // const [channel, setChannel] = useState();

    // useEffect(() => {
    //   const createAndWatchChannel = async () => {
    //     const newChannel = client.channel('messaging', {
    //       members: ['winter-dream-9']
    //     });
    //     await newChannel.create();
    //     setChannel(newChannel);
    //   };
  
    //   createAndWatchChannel();
    // }, []);

    return (
        <Channel channel={channel}>
          <MessageList />
          <MessageInput />
        </Channel>
      );
    
  }

const ChannelListScreen = props => {
    const { setChannel } = useAppContext();

    return (
      <ChannelList
      onSelect={(channel) => {
        const { navigation } = props;
            setChannel(channel);
            navigation.navigate('ChannelScreen');
        }}
        filters={filters}
        sort={sort}
      />
    );
  }

  

const chatClient = StreamChat.getInstance('ps7e8bkgwsdh');

const ChatStackNavigator = () => {
    const { clientIsReady } = useChatClient();

    if (!clientIsReady) {
      return <Text>Loading chat ...</Text>
    }


  return (
        <OverlayProvider>
             <Chat client={chatClient}>
                 <Stack.Navigator >
                  
                
                    {/* <Stack.Screen name="ChannelList" component={ChannelListScreen} options={{headerShown: true}}/> */}

                    <Stack.Screen name="ChannelScreen" component={ChannelScreen} options={{headerShown: true}} />   
                 </Stack.Navigator>
                </Chat>
        </OverlayProvider>

  )
}

export default ChatStackNavigator





