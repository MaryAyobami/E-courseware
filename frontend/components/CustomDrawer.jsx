import React,{useContext, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import AwesomeAlert from 'react-native-awesome-alerts';
import { AuthContext } from '../components/context/AuthContext'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CustomDrawer = props => {
  const authContext = useContext(AuthContext);
  const [alert, setAlert] = useState(false)
  const handleLogout = () => {
      return(
        <View>
          <AwesomeAlert
          show={true}
          showProgress={false}
          title="AwesomeAlert"
          message="I have a message for you!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
        </View>

      )
      // Alert.alert(
      //   'Are you sure you want to logout?',
      //   {
      //     text: 'Cancel',
      //     onPress: () => console.log('Cancel Pressed'),
      //     style: 'cancel',
      //   },
      //   // {text: 'Yes', onPress: () => authContext.logout()},
      //   // {cancelable: true}
      // )
  }

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor:  '#297373'}}>
        <ImageBackground
          source={require('../assets/drawer-bg.jpg')}
          style={{padding: 20}}>
          <Image
            source={require('../assets/drawer-bg.jpg')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontFamily: 'AgeoPersonalUse-Medium',
              marginBottom: 5,
            }}>
            Mary Ayobami
          </Text>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 20}}>
          <DrawerItemList {...props}
           
          />
        </View>
      </DrawerContentScrollView>
      
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' , backgroundColor: '#fff'} }>

        <TouchableOpacity 
         onPress={ () => authContext.logout()} 
         style={{paddingVertical: 15, flexDirection: 'row', alignItems:"flex-start" , justifyContent:'space-between' , width: '50%', }}
         
         >
    
            <Ionicons name="exit-outline" size={22} color='#732955'/>
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'AgeoPersonalUse-Medium',
                color:'#732955'
                // marginLeft: 20,
              }}>
              Sign Out
            </Text>
    
        </TouchableOpacity>
      
    </View>
  </View>
  );
};

export default CustomDrawer;