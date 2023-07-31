import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LecturerProfile from '../../screens/LecturerProfile';
import Activity from '../../screens/Activity';


const Stack = createStackNavigator();


const LecturerProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName='LecturerProfile' >
        <Stack.Screen name="LecturerActivity" component={Activity} options={{headerShown: false}} />  
      <Stack.Screen name="LecturerProfile" component={LecturerProfile} options={{headerShown: false}} />        
</Stack.Navigator>
  )
}

export default LecturerProfileStack

const styles = StyleSheet.create({})