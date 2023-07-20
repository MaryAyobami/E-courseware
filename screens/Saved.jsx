import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Empty from './Empty'
import Header from './Header'
import { storage } from './StuLogin'
import Resource from '../components/Resource'
import { DrawerActions } from '@react-navigation/native';
import FileViewer from 'react-native-file-viewer';
import { concat } from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    
     
      FileViewer.open(uri, { showOpenWithDialog: true })
            .then(() => {
              
            })
            .catch(_err => {
              
            }); 
  }

  
  return (
    <View className='bg-bgcolor flex-1'>
      <Header name="Bookmarks" open={()=>  navigation.openDrawer()}/>
      {
        savedResources?
        <View className='w-[98%] mx-auto pt-8 ' >
    
           <FlatList
            data={savedResources}
            renderItem = {({item})=>
               <View  className=' bg-gray my-2 p-4 flex flex-row rounded-lg shadow-2xl '  onPress={openResource(item.uri)}>
                        <Icon
                  name="book-open-page-variant-outline"
                  size={25}
                  color= '#3d5a80'
                  style={{ marginLeft: 1, padding:2 }}
                />
                <TouchableOpacity >
                <Text  className="font-ageonormal text-[18px] p-2 text-grey-800">
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
        <Empty content="You have no saved resources"/>
      }
      
   
    </View>
  )
}

export default Saved

const styles = StyleSheet.create({})