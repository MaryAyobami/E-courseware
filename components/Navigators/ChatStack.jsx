import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MainChat from '../../screens/ChatStack/MainChat';
import GroupChat from '../../screens/ChatStack/GroupChat';

const Stack = createStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator initialRouteName='Discussion Forums' >
        <Stack.Screen name="Discussion Forums" component={MainChat} options={{headerShown: false}} />       
        <Stack.Screen name="Chatroom" component={GroupChat} options={{headerShown: false}} />       
        
    </Stack.Navigator>
  )
}

export default ChatStack





