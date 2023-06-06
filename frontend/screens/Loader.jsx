import { StyleSheet, Text, View , Dimensions} from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native";
import { useState } from "react";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Loader = () => {
    
  return (
    <View style={styles.animation} >
        <LottieView
            source={require("../assets/loader2.json")}
            autoPlay
        />
        <Text className='text-main text-xl font-ageobold absolute top-0 bottom-0'>Loading...</Text>
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    animation: {
        width: windowWidth,
        height: windowHeight,
      },
})