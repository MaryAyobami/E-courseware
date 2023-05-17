import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProfileHeader = (props) => {
    const {title} = props
  return (
    <View className='w-screen h-[10vh] p-4 bg-green '>
      <Text className='font-ageoheavy text-white text-4xl text-center '>{title}</Text>
    </View>
  )
}

export default ProfileHeader

const styles = StyleSheet.create({})