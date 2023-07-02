import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from './Header'
import { DrawerActions } from '@react-navigation/native';

const Settings = ({navigation}) => {
  const [on,setOn] = useState(true)
  const [off, setOff] = useState(false)
  return (
    <View className='bg-bgcolor h-screen '>
      <Header name="Notification" open={()=>  navigation.dispatch(DrawerActions.openDrawer())}/>

      <View className='pt-12 w-[96%] mx-auto'>
        <View className='flex flex-row justify-between'> 

      {
        on?
        <Text className='font-ageoheavy text-main text-xl'> ON</Text>
        :
        <Text className='font-ageoheavy text-main text-xl'> OFF</Text>
      }
       
        <View className='w-[20%] px-2 mr-4 flex flex-row justify-between'>
         <TouchableOpacity onPress={()=> 
          {setOn(true)
           setOff(false)
          }
          } className={on? 'bg-lightmain p-4 w-[50%] border border-y-0 border-l-0 rounded-l-full' :'bg-darkmain rounded-l-full p-4 w-[50%] border border-y-0 border-l-0'}>

         </TouchableOpacity>

         <TouchableOpacity  onPress={()=> 
          {setOff(true)
          setOn(false)
          }
          } className={off? 'bg-lightmain p-4 w-[50%] rounded-r-full ' :'bg-darkmain rounded-r-full p-4 w-[50%] '}>
      
         </TouchableOpacity>
      </View>
        </View>
        <Text className='font-ageonormal text-xl text-black  w-[98%] mx-auto pt-6'>If turned on , notifications will be sent to you when new resources related to your level are uploaded.</Text>     

      </View>

    </View>
  )
}

export default Settings

const styles = StyleSheet.create({})