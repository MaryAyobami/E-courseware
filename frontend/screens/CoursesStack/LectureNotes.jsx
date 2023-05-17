import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LectureNotes = ({route,navigation}) => {
  const {resources} = route.params
  console.log(resources)
  return (
    <View>
      <Text>LectureNotes</Text>
    </View>
  )
}

export default LectureNotes

const styles = StyleSheet.create({})