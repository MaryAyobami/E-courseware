import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../../screens/SearchStack/Search';
import SearchGroup from '../../screens/SearchStack/SearchGroup';


const Stack = createStackNavigator();
const SearchStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="SearchGroup" component={SearchGroup} options={{headerShown: false}} />       
        <Stack.Screen name="SearchScreen" component={Search} options={{headerShown: true}} />       
       
    </Stack.Navigator>
  )
}

export default SearchStackNavigator