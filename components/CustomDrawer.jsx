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
import { storage } from '../screens/StuLogin';
import { MMKV } from 'react-native-mmkv'

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
      //     onPress: () => 
      //     style: 'cancel',
      //   },
      //   // {text: 'Yes', onPress: () => authContext.logout()},
      //   // {cancelable: true}
      // )
  }

  return (
    <View className='flex-1 bg-bgcolor'>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#c9d1d3'}}>
        {/* <ImageBackground
          source={require('../assets/logoo.png')}
          style={{padding: 20}}> */}
          <Image
            source={require('../assets/mcourseware.png')}
            style={{height: 200, width: '100%', borderRadius: 10, marginBottom: 0}}
          />
          {/* <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontFamily: 'tilda-sans_medium',
              marginBottom: 5,
            }}>
          {storage.getString('user.name')}
          </Text>
        </ImageBackground> */}
        <View style={{flex: 1, backgroundColor: '#fff' , paddingTop: 40}}>
          <DrawerItemList {...props}
           
          />
        </View>
      </DrawerContentScrollView>
      
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ee6c4d' , backgroundColor: '#eaeaea'} }>

        <TouchableOpacity 
         onPress={ () => {
          Alert.alert('Logout', 'Are you sure you want to logout?',[
            {
              text: 'Cancel',
              // onPress: () => 
            },
            {
              text: 'Yes',
              onPress: () => authContext.logout(),
              
            },
          ])
      
         }} 
         style={{paddingVertical: 15, flexDirection: 'row', alignItems:"flex-start" , justifyContent:'space-between' , width: '50%', }}
         
         >
    
            <Ionicons name="exit-outline" size={22} color='#ee6c4d' />
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'tilda-sans_medium',
                color:'#ee6c4d'
                // marginLeft: 20,
              }}>
              Logout
            </Text>
    
        </TouchableOpacity>
      
    </View>
  </View>
  );
};

export default CustomDrawer;