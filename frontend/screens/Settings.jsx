import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from './Header'


const Settings = ({navigation}) => {
  return (
    <View>
      <Header name="Settings" open={()=>navigation.openDrawer()}/>
     
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({})