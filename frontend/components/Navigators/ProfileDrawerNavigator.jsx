import { View, Text } from 'react-native'
import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import Upload from '../../screens/Upload';
import Profile from '../../screens/Profile';
import Saved from '../../screens/Saved';
import Logout from '../../screens/Logout';
import { getHeaderTitle } from '@react-navigation/elements';
import ProfileHeader from '../ProfileHeader';
import Downloads from '../../screens/Downloads';
import Settings from '../../screens/Settings';
import CustomDrawer from '../CustomDrawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Drawer = createDrawerNavigator();

const ProfileDrawerNavigator = () => {
  return (
    <Drawer.Navigator
    initialRouteName="Profile"
    drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{
      headerShown: false,
      // overlayColor: '#DFF0EB',
      // header: ({ navigation, route, options }) => {
      //   const title = getHeaderTitle(options, route.name);
      
      //   return <ProfileHeader title={title} />;
      // }
      // ,
      headerStyle:{
        height: 80,
        backgroundColor: '#fff',
        headerShown: false,
        drawerActiveBackgroundColor:  '#297373',
        drawerInactiveTintColor: '#297373',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerItemStyle: {
          // marginLeft: -25,
         // fontFamily: 'Roboto-Medium',  
          fontSize: 20,
          fontFamily: 'tilda-sans_medium',
     
        },
      }
     }
    

    }
    >
        <Drawer.Screen name="Profile" component={Profile} 
            options={{
              drawerIcon: ({color}) => (
                <Icon name="account" size={22} color={color} />
              ),
              drawerLabelStyle: {
                // marginLeft: -25,
               // fontFamily: 'Roboto-Medium',  
                fontSize: 18,
                fontFamily: 'tilda-sans_medium',
           
              },
              drawerActiveBackgroundColor:  '#297373',
              drawerInactiveTintColor: '#297373',
              drawerActiveTintColor: '#fff',
              drawerInactiveTintColor: '#333',
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
              drawerActiveBackgroundColor:  '#297373',
              drawerInactiveTintColor: '#297373',
              drawerActiveTintColor: '#fff',
              drawerInactiveTintColor: '#333',
          }}
        />
        <Drawer.Screen name="Downloads" component={Downloads}
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
          drawerActiveBackgroundColor:  '#297373',
          drawerInactiveTintColor: '#297373',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#333',
        }}
        />
        <Drawer.Screen name="Share" component={Upload}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="cloud-upload-outline" size={22} color={color} />
          ),
          drawerLabelStyle: {
            // marginLeft: -25,
           // fontFamily: 'Roboto-Medium',  
            fontSize: 18,
            fontFamily: 'tilda-sans_medium',
          },
          drawerActiveBackgroundColor:  '#297373',
          drawerInactiveTintColor: '#297373',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#333',
        }}
        />
        <Drawer.Screen name="Settings" component={Settings}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="cogs" size={22} color={color} />
          ),
          drawerLabelStyle: {
            // marginLeft: -25,
           // fontFamily: 'Roboto-Medium',  
            fontSize: 18,
            fontFamily: 'tilda-sans_medium',
       
          },
          drawerActiveBackgroundColor:  '#297373',
          drawerInactiveTintColor: '#297373',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#333',
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

export default ProfileDrawerNavigator

