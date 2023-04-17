import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const ForgotPassword = ({navigation}) => {
  return (
    <SafeAreaView>
     <View className="bg-green w-screen h-screen">
        <View className='flex-1 items-center justify-center'>
             <Text className='w-[95%] text-4xl text-center font-ageomedium text-gray'>A password recovery link has been sent to <Text className="text-orange font-ageobold" onPress={()=> navigation.navigate('RecoverPassword')}>your email</Text>. Click on it to change your password. </Text>
        </View>
       
     </View>
    </SafeAreaView>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({})