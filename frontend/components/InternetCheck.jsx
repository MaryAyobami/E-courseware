import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  Dimensions,
  SafeAreaView,
  Modal
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";

const InternetCheck = (prop) => {
    const {isOffline} = prop

    // const Button = ({children, ...props}) => (
    //     <TouchableOpacity style={styles.button} {...props}>
    //       <Text style={styles.buttonText}>{children}</Text>
    //     </TouchableOpacity>
    //   );
      
 return (
    <View>
        <Modal 
            visible={isOffline} 
            animationType="slide"
            style={styles.modal} animationInTiming={600}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Connection Error</Text>
                <Text style={styles.modalText}>
                Oops! Looks like your device is not connected to the Internet.
                </Text>
                {/* <Button onPress={onRetry} disabled={isRetrying}>
                Try Again
                </Button> */}
            </View>
            </Modal>
    </View>

      );
 
}

export default InternetCheck

const styles = StyleSheet.create({
    // ...
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    
    },
    modalContainer: {
      backgroundColor:  '#732955',
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 40,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: '600',
      color: '#fff',
      fontFamily: 'GalanoClassicAltMedium'
    },
    modalText: {
      fontSize: 19,
      color: '#fff',
      marginTop: 14,
      textAlign: 'center',
      marginBottom: 10,
      fontFamily: 'tilda-sans_medium'
    },
    button: {
      backgroundColor: '#000',
      paddingVertical: 12,
      paddingHorizontal: 16,
      width: '100%',
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 20,
    },
  });