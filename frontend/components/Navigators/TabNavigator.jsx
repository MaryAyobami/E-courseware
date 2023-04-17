import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Courses from '../../screens/Courses';
import GroupChat from '../../screens/GroupChat';
import Home from '../../screens/Home';
import Search from '../../screens/Search';
import { StyleSheet, Text, View , Image, Dimensions,Pressable} from 'react-native'
import { Link } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../../screens/Profile';
import Saved from '../../screens/Saved';
import Logout from '../../screens/Logout';

import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileDetails = () => {
  <Drawer.Navigator
  initialRouteName="Profilee"
  >
      <Drawer.Screen name="Profilee" component={Profile} />
      <Drawer.Screen name="Saved" component={Saved} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
}

const ProfileNavigator = () =>{
  return(
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home" 
        component= {Home}
        options={{headerShown: false}}
        />
        <Stack.Screen name="Profile" 
        component= {Logout}
        options={{headerShown: false}}
        />
        {/* <Stack.Screen name="Details" 
        component= {ProfileDetails}
        options={{headerShown: false}}
        />
        */}
    </Stack.Navigator>
  )
}


const ProfileHeader = () =>{
   return(
    <View className="w-screen h-14">
      <View className='flex-1 justify-end items-end px-4 '>
          <Link 
          to={{screen:'Profile' }}
          >
             <Icon name="account-circle" color='#297373' size={45} />
          </Link>
      </View>
     
    </View>
   )
}



const TabNavigator = () => {
  return (
    <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      header:()=> <ProfileHeader/>,
      tabBarActiveTintColor: '#297373',
      tabBarActiveBackgroundColor: '#297373',
    }}
  >
    <Tab.Screen
      name="profilenavigator"
      component={ProfileNavigator}
      options={{
        tabBarShowLabel: false,
        tabBarIcon: () => (
          <Icon name="home-variant-outline" color='#FF8552' size={30} />
      ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name="magnify" color='#FF8552' size={30} />
        ),
      
      }}
    />
    <Tab.Screen
      name="Courses"
      component={Courses}
      options={{
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name="notebook-multiple" color='#FF8552' size={30} />
        ),
        
      }}
    />
    <Tab.Screen
      name="GroupChat"
      component={GroupChat}
      options={{
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name="chat" color='#FF8552' size={30} />
        ),
        tabBarBadge: 3,
      }}
    />
  </Tab.Navigator>
  )
}

export default TabNavigator

