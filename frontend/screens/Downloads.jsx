import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from './Header'
import Empty from './Empty'

const Downloads = ({navigation}) => {
  return (
    <View className='bg-bgcolor h-full'>
      <Header name="Downloads" open={()=>navigation.openDrawer()}/>
      <Empty content="You have no downloads"/>
    </View>
  )
}

export default Downloads

const styles = StyleSheet.create({})