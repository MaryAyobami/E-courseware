import { View, Text } from 'react-native'
import React, { useState , useEffect} from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import Upload from '../../screens/UploadVerification/Upload';
import Profile from '../../screens/Profile';
import Saved from '../../screens/Saved';
import Logout from '../../screens/Logout';
import { getHeaderTitle } from '@react-navigation/elements';
import ProfileHeader from '../ProfileHeader';
import Downloads from '../../screens/Downloads';
import Settings from '../../screens/Settings';
import CustomDrawer from '../CustomDrawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UploadStackNavigator from './UploadStackNavigator';
import { storage } from '../../screens/StuLogin';
import { createStackNavigator } from '@react-navigation/stack';
import LecturerProfile from '../../screens/LecturerProfile';
import LecturerProfileStack from './LecturerProfileStack';



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const ProfileDrawerNavigator = () => {
  const [status , setStatus] = useState(false)
  const [userType, setUsertype] = useState()
  useEffect(()=>{

    if(storage.getString('user.userType')){
     setUsertype(JSON.parse(storage.getString('user.userType')))
    }
    
    if(storage.getBoolean('user.userStatus')){
      setStatus(storage.getBoolean('user.userStatus')) 
      
    }
   
   })
   

  if (userType == 'Student'){

  return (
    <Drawer.Navigator
    initialRouteName="Profile"
    drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{
      headerShown: false,
      }
    

  }
    >
        <Drawer.Screen name="Profile" component={Profile} 
            options={{
              drawerIcon: ({color}) => (
                <Icon name="account" size={22} color={color} />
              ),
              drawerLabelStyle: {
                fontSize: 18,
                fontFamily: 'tilda-sans_medium',
           
              },
              drawerActiveBackgroundColor:  '#8fb3d0',
              drawerInactiveTintColor: '#3d5a80',
              drawerActiveTintColor:'#18263b',
              drawerInactiveTintColor: '#293241',
              drawerStyle:{
                backgroundColor:  '#fff',
              }
            }}
        />

        <Drawer.Screen name="Bookmarks" component={Saved}
          options={{
            drawerIcon: ({color}) => (
              <Icon name="bookmark-multiple-outline" size={22} color={color} />
            
              ),
              drawerLabelStyle: {
                // marginLeft: -25,
               // fontFamily: 'Roboto-Medium',  
                fontSize: 18,
                fontFamily: 'tilda-sans_medium',
           
              },
              drawerActiveBackgroundColor:  '#8fb3d0',
              drawerInactiveTintColor: '#3d5a80',
              drawerActiveTintColor:'#18263b',
              drawerInactiveTintColor: '#293241',
          }}
        />
        {/* <Drawer.Screen name="Downloads" component={Downloads}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="download-multiple" size={22} color={color} />
          ),
          drawerLabelStyle: {
            // marginLeft: -25,
           // fontFamily: 'Roboto-Medium',  
            fontSize: 18,
            fontFamily:'tilda-sans_medium',
       
          },
          drawerActiveBackgroundColor: '#98c1d9',
          drawerInactiveTintColor: '#3d5a80',
          drawerActiveTintColor: '#3d5a80',
          drawerInactiveTintColor: '#293241',
        }}
        /> */}
        {
          status? 
          <Drawer.Screen name="Share" component={UploadStackNavigator}
          options={{
            drawerIcon: ({color}) => (
              
              <Icon name="cloud-upload-outline"  size={22} color={color} />
            ),
            drawerLabelStyle: {
              // marginLeft: -25,
             // fontFamily: 'Roboto-Medium',  
              fontSize: 18,
              fontFamily: 'tilda-sans_medium',
            },
            drawerActiveBackgroundColor:  '#8fb3d0',
            drawerInactiveTintColor: '#3d5a80',
            drawerActiveTintColor:'#18263b',
            drawerInactiveTintColor: '#293241',
          }}
          />
          :
          <Drawer.Screen name="Share" component={UploadStackNavigator}
          options={{
            drawerIcon: ({color}) => (
              
              <Icon name="lock"  size={22} color={ '#c9d1d3'} />
            ),
            drawerLabelStyle: {
              // marginLeft: -25,
             // fontFamily: 'Roboto-Medium',  
              fontSize: 18,
              fontFamily: 'tilda-sans_medium',
              color: '#c9d1d3',
            
            },
          }}
          />
        }
     
        <Drawer.Screen name="Notification" component={Settings}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="bell" size={22} color={color} />
          ),
          drawerLabelStyle: {
            // marginLeft: -25,
           // fontFamily: 'Roboto-Medium',  
            fontSize: 18,
            fontFamily: 'tilda-sans_medium',
       
          },
          drawerActiveBackgroundColor:  '#8fb3d0',
          drawerInactiveTintColor: '#3d5a80',
          drawerActiveTintColor:'#18263b',
          drawerInactiveTintColor: '#293241',
        }}
        />
        {/* <Drawer.Screen name="Logout" component={Logout} 
        options={{
          drawerIcon: ({color}) => (
            <Icon name="logout" size={22} color={color} />
          ),
        }}
        /> */}
   </Drawer.Navigator>
  )
      }

      else if(userType == 'Lecturer'){
return(

      <LecturerProfileStack/>
    )
      }
}

export default ProfileDrawerNavigator

