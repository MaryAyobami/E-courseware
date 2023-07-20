import { StyleSheet, Text, View , Dimensions} from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native";
import { useState } from "react";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Loader = () => {
    
  return (
    <View  style={styles.animation}>
        <LottieView
            source={require("../assets/loader2.json")}
            autoPlay
            style={{
              // marginTop: 20,
              // flex:1,
              // width: '60%'
             
            }}
        />
        {/* <Text className='text-main text-[18px] font-ageobold p-20'>Loading...</Text> */}
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    animation: {
        width: windowWidth,
        height: windowHeight,
        // flex:1
      },
})