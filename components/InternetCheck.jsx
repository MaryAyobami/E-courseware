import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  SafeAreaView,
  Modal
} from 'react-native';
import LottieView from "lottie-react-native";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const InternetCheck = (prop) => {
    const {isOffline, isRetry} = prop

    const Button = ({children, ...props}) => (
        <TouchableOpacity style={styles.button} {...props}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      );
      
 return (
    <View >
    
        <Modal 
            visible={isOffline} 
            animationType="slide"
            style={styles.modal} animationInTiming={600}>
            <View style={styles.modalContainer}>
                {/* <Text style={styles.modalTitle}>Connection Error</Text> */}
                <View className='flex-1 pt-20 px-4'>
                  <LottieView
                    source={require("../assets/no-internet.json")}
                    style={styles.animation}
                    autoPlay
                />
                  <Text style={styles.modalText}>
                  Oops! Looks like your device is not connected to the Internet.
                  </Text>
                </View>
     
                {/* <Button onPress={onRetry}>
                </Button> */}
                <TouchableOpacity style={styles.button} onPress={isRetry}>
                  <Text style={styles.buttonText}>Retry</Text>
                </TouchableOpacity>
            </View>
            </Modal>
    </View>

      );
 
}

export default InternetCheck

const styles = StyleSheet.create({
    // ...
    modal: {
      height: '100%',
    
      margin: 0,
    
    },
    modalContainer: {
      backgroundColor:  '#ee6c4d',
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 40,
      alignItems: 'center',
      flex:1,
      height: '100%',
      justifyContent: 'flex-end',
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: '600',
      color: '#eaeaea',
      fontFamily: 'GalanoClassicAltMedium'
    },
    modalText: {
      fontSize: 24,
      color:'#eaeaea',
      marginTop: 14,
      textAlign: 'center',
      marginBottom: 10,
      fontFamily: 'tilda-sans_medium'
    },
    button: {
      backgroundColor: '#3d5a80',
      paddingVertical: 12,
      paddingHorizontal: 16,
      width: '100%',
      alignItems: 'center',
      marginTop: 10,
      
    },
    buttonText: {
      color:'#eaeaea',
      fontSize: 20,
      fontFamily: 'tilda-sans_medium'
    },
    animation:{
      // height: '100%',
      width: '100%'
    }
  });