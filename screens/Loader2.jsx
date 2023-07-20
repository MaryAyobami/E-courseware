import { StyleSheet, Text, View , Dimensions, TouchableOpacity} from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native";
import { useState } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Loader2 = (props) => {
    
  return (
    <View style={styles.animationbg} >
        <LottieView
            source={require("../assets/loader.json")}
            autoPlay
            // style={styles.animation}
        />

        <TouchableOpacity onPress={props.press} className='p-6'>
          <Icon name='cancel' size={40} color='#ee6c4d' />
      </TouchableOpacity>
        <Text className='text-bgcolor text-[25px] font-ageoheavy absolute top-60 left-12 right-12  text-center px-4 py-4' >Fetching your learning materials...</Text>
    </View>
  )
}

export default Loader2

const styles = StyleSheet.create({
    animationbg: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: '#3d5a80',
        flex: 1
      },
      animation: {
        width: windowWidth,
        height: windowHeight,
        // backgroundColor: '#3d5a80',
        // flex: 1
      },
    textstyle:{
        position: 'absolute',
        height: windowHeight*0.5
    }
})