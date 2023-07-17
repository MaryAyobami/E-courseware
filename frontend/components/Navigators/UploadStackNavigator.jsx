import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Verification from '../../screens/UploadVerification/Verification';
import Upload from '../../screens/UploadVerification/Upload';
import VerificationOption1 from '../../screens/UploadVerification/VerificationOption1';
import VerificationOption2 from '../../screens/UploadVerification/VerificationOption2';
import ApprovalRequestSuccessful from '../../screens/UploadVerification/ApprovalRequestSuccessful';
import VerificationSuccessful from '../../screens/UploadVerification/VerificationSuccessful';
import UploadSuccessful from '../../screens/CoursesStack/UplaodSuccessful';

const Stack = createStackNavigator();

const UploadStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Verification' >
        <Stack.Screen name="Verification" component={Verification} options={{headerShown: false}} />       
        <Stack.Screen name="Upload" component={Upload} options={{headerShown: false}} /> 
        <Stack.Screen name="UploadSuccessfull" component={UploadSuccessful} options={{headerShown: false}} /> 
        <Stack.Screen name="VerificationSuccessful" component={VerificationSuccessful} options={{headerShown: false}} /> 
        <Stack.Screen name="ID Card Verification" component={VerificationOption1} options={{headerShown: true}} />             
        <Stack.Screen name="Instructor's Approval" component={VerificationOption2} options={{headerShown: true}} />        
        <Stack.Screen name="ApprovalRequestSuccessful" component={ApprovalRequestSuccessful} options={{headerShown: false}} />        
    </Stack.Navigator>
  )
}

export default UploadStackNavigator





