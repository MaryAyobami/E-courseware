import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GroupChat from '../../screens/ChatStack/GroupChat';
import Home from '../../screens/Home';
import { StyleSheet, Text, View , Image, Dimensions,Pressable} from 'react-native'
import { Link } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../../screens/Profile';
import Saved from '../../screens/Saved';
import Logout from '../../screens/Logout';


import { createDrawerNavigator } from '@react-navigation/drawer';
import Upload from '../../screens/UploadVerification/Upload';
import SearchStackNavigator from './SearchStackNavigator';
import ProfileDrawerNavigator from './ProfileDrawerNavigator';
import CoursesStackNavigator from './CoursesStackNavigator';
import ChatStackNavigator from './ChatStackNavigator';
import ChatStack from './ChatStack';

const { width, height } = Dimensions.get("window")
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// const ProfileDetails = () => {

//   <Drawer.Navigator
//      initialRouteName="Profile">
//       <Drawer.Screen name="Profile" component={Profile} />
//       <Drawer.Screen name="Saved" component={Saved} />
//       <Drawer.Screen name="Logout" component={Logout} />
//     </Drawer.Navigator>
// }


// const ProfileHeader = () =>{
//    return(
//     <View className="w-screen h-14">
//       <View className='flex-1 justify-end items-end px-4 '>
//           <Link 
//           to={{screen:'Profile' }}
//           >
//              <Icon name="account-circle" color='#297373' size={45} />
//           </Link>
//       </View>
     
//     </View>
//    )
// }



const TabNavigator = () => {

  return (
    <View style={{
      width,
      height,
  }}>
    <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
  //    header:()=> <ProfileHeader/>,
      headerShown: false,
      headerStyle:{
        height: 60,
        backgroundColor: 'white'
      },
      headerTitleStyle:{
        fontSize: 27,
        color:  '#297373',
        fontFamily: 'serif',
        fontWeight: 'bold',
        padding: 8
      },
      tabBarActiveTintColor: '#ee6c4d',
      tabBarActiveBackgroundColor:'#fff' ,
       
      tabBarHideOnKeyboard: true,
      tabBarInactiveBackgroundColor:'#eaeaea' ,
    }}
  >
    <Tab.Screen
      name="Home"
      component={CoursesStackNavigator}
      options={{
        tabBarShowLabel: true,
        tabBarLabelStyle:{
          fontSize: 12,
          fontFamily: 'tilda-sans_medium',
          color:  '#ee6c4d',
          paddingBottom: 8 
      },
      
        tabBarIcon: () => (
          <Icon name="home-variant-outline" color= '#ee6c4d' size={30} />
      ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchStackNavigator}
      options={{
        tabBarShowLabel: true,
        tabBarLabelStyle:{
            fontSize: 12,
            fontFamily: 'tilda-sans_medium',
            color:  '#ee6c4d',
            paddingBottom: 8 
        },
        tabBarIcon: ({ color, size }) => (
          <Icon name="magnify" color= '#ee6c4d'size={30} />
        ),
      
      }}
    />

    <Tab.Screen
      name="Discussion Forum"
      component={ChatStack}
      options={{
        tabBarShowLabel: true,
        tabBarLabelStyle:{
          fontSize: 12,
          fontFamily: 'tilda-sans_medium',
          color:  '#ee6c4d',
          paddingBottom: 8 
      },
      
        tabBarIcon: ({ color, size }) => (
          <Icon name="chat" color=  '#ee6c4d' size={30} />
        ),
        tabBarBadge: 3,
      }}
    />
    <Tab.Screen
      name="Account"
      component={ProfileDrawerNavigator}
      options={{
        tabBarShowLabel: true,
        tabBarLabelStyle:{
          fontSize: 12,
          fontFamily: 'tilda-sans_medium',
          color: '#ee6c4d',
          paddingBottom: 8 
      },
      
        tabBarIcon: ({ color, size }) => (
          <Icon name="account" color=  '#ee6c4d'size={30} />
        ),
        // tabBarBadge: 3,
      }}
    />

  </Tab.Navigator>
  </View>
  )
}

export default TabNavigator

