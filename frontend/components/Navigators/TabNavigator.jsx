import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GroupChat from '../../screens/GroupChat';
import Home from '../../screens/Home';
import { StyleSheet, Text, View , Image, Dimensions,Pressable} from 'react-native'
import { Link } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../../screens/Profile';
import Saved from '../../screens/Saved';
import Logout from '../../screens/Logout';


import { createDrawerNavigator } from '@react-navigation/drawer';
import Upload from '../../screens/Upload';
import SearchStackNavigator from './SearchStackNavigator';
import ProfileDrawerNavigator from './ProfileDrawerNavigator';
import CoursesStackNavigator from './CoursesStackNavigator';

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
      tabBarActiveTintColor: '#fff',
      tabBarActiveBackgroundColor: '#fff',
       
      tabBarHideOnKeyboard: true,
      tabBarInactiveBackgroundColor:'#E6E6E6'
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarShowLabel: false,
        tabBarIcon: () => (
          <Icon name="home-variant-outline" color='#732955' size={30} />
      ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchStackNavigator}
      options={{
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name="magnify" color='#732955' size={30} />
        ),
      
      }}
    />
    <Tab.Screen
      name="Courses"
      component={CoursesStackNavigator}
      options={{
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name="notebook-multiple" color='#732955' size={30} />
        ),
        
      }}
    />
    <Tab.Screen
      name="ProfileDetails"
      component={ProfileDrawerNavigator}
      options={{
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name="account" color='#732955' size={30} />
        ),
        // tabBarBadge: 3,
      }}
    />
  </Tab.Navigator>
  </View>
  )
}

export default TabNavigator

