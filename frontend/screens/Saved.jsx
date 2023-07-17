import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Empty from './Empty'
import Header from './Header'
import { storage } from './StuLogin'
import Resource from '../components/Resource'
import { DrawerActions } from '@react-navigation/native';
import FileViewer from 'react-native-file-viewer';
import { concat } from 'react-native-reanimated'

const Saved = ({navigation}) => {

  const [savedResources,setSavedResources] = useState('')
  
const resources = storage.getString('savedResources')
  useEffect(()=>{
    if (resources != undefined){
      const getResources = JSON.parse(storage.getString('savedResources'))
      setSavedResources(getResources)
    }    
  
  },[])
 

  const openResource = (uri) =>{
    console.log('hhhhh')
     console.log(uri)
      FileViewer.open(uri, { showOpenWithDialog: true })
            .then(() => {
              console.log('Success');
            })
            .catch(_err => {
              console.log(_err);
            }); 
  }

  console.log(savedResources)
  return (
    <View className='bg-bgcolor h-full'>
      <Header name="Bookmarks" open={()=>  navigation.dispatch(DrawerActions.openDrawer())}/>
      {
        savedResources?
        <View className='w-[98%] mx-auto pt-8 ' >
    
           <FlatList
            data={savedResources}
            renderItem = {({item})=>
               <View  className=' bg-bgcolor rounded-lg shadow-2xl '>
                <TouchableOpacity  onPress={openResource(item.uri)}>
                <Text  className="font-ageonormal text-[16px] text-grey-800">
                  {item.name}
                </Text>
                </TouchableOpacity>

              </View>
            }
            keyExtractor={item => item._id}
            // contentContainerStyle={{
            //   flexGrow: 1,
            //   }}
          
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={getTasks} size={'large'} colors={['gray']} />
            // }
            />

        </View>
        :
        <Empty content="You have no bookmarks"/>
      }
      
   
    </View>
  )
}

export default Saved

const styles = StyleSheet.create({})