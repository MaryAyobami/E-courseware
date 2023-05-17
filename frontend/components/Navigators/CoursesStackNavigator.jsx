import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Courses from '../../screens/CoursesStack/Courses';
import LectureNotes from '../../screens/CoursesStack/LectureNotes';

const Stack = createStackNavigator();

const CoursesStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Courses' >
        <Stack.Screen name="Learning Materials" component={Courses} options={{headerShown: false}} />       
        <Stack.Screen name="Lecture Notes" component={LectureNotes} options={{headerShown: true}} />       
   
    </Stack.Navigator>
  )
}

export default CoursesStackNavigator





