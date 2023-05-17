import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Empty = (props) => {
  return (
    <View className="bg-white h-screen w-screen">
      <View className="flex-1 items-center justify-center">
      <View>
            <Icon name="content-save-off" size={200} color='#eee' />
        </View>
       <View>
            <Text className="text-center font-ageoheavy text-gray text-5xl">Opps!</Text>
            <Text className="text-center font-ageomedium text-gray text-2xl">{props.content}</Text>
       </View>
      </View>
    </View>
  )
}

export default Empty

const styles = StyleSheet.create({})