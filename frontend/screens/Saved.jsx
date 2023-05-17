import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import Empty from './Empty'
import Header from './Header'
import { storage } from './StuLogin'
import Resource from '../components/Resource'

const Saved = ({navigation}) => {
  const savedResources = JSON.parse(storage.getString('savedResources'))
  console.log(savedResources)
  return (
    <View>
      <Header name="Bookmarks" open={()=>navigation.openDrawer()}/>
      {
        savedResources?
        <View className='w-[98%] mx-auto pt-8 ' >
    
           <FlatList
            data={savedResources}
            renderItem = {({item})=>
              <Resource name={item.name} link={item.uri} />    
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