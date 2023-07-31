import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Courses from '../../screens/CoursesStack/Courses';
import LectureNotes from '../../screens/CoursesStack/LectureNotes';
import Assignments from '../../screens/CoursesStack/Assignments';
import LecturerView from '../../screens/CoursesStack/LecturerView';
import LecturerUpload from '../../screens/CoursesStack/LecturerUpload';
import LecturersAR from '../../screens/CoursesStack/LecturersAR';
import UploadSuccessful from '../../screens/CoursesStack/UplaodSuccessful';
import AR from '../../screens/CoursesStack/AR';

const Stack = createStackNavigator();

const CoursesStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Courses' >
        <Stack.Screen name="Learning Materials" component={Courses} options={{headerShown: false}} />       
        <Stack.Screen name="AcademicResources" component={LectureNotes} options={{headerShown: false}} />  
        <Stack.Screen name="LecturerAR" component={LecturersAR} options={{headerShown: false}} />
        <Stack.Screen name="AR" component={AR} options={{headerShown: false}} />  
        <Stack.Screen name="LecturerView" component={LecturerView} options={{headerShown: false}} />  
        <Stack.Screen name="LecturerUpload" component={LecturerUpload} options={{headerShown: false}} /> 
        <Stack.Screen name="UploadSuccessfull" component={UploadSuccessful} options={{headerShown: false}} />       
        <Stack.Screen name="Assignments" component={Assignments} options={{headerShown: false}} />       
   
    </Stack.Navigator>
  )
}

export default CoursesStackNavigator





