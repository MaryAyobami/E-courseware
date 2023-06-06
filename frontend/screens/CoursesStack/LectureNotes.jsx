import { StyleSheet, Text, View,ScrollView,FlatList } from 'react-native'
import React from 'react'
import Resource from '../../components/Resource'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LectureNotes = ({route,navigation}) => {
  const {resources,title} = route.params
  console.log(resources)
  return (
    <View className='bg-bgcolor h-screen w-screen'>
     <View className='h-16  w-screen '>
       <Text className='p-4 text-center text-blackk font-ageobold text-4xl'>{title}s</Text>
     </View>
     {/* resources */}
     
    {
      resources.length? 
      <View className='w-[98%] mx-auto pt-8 ' >
      <FlatList
              data={resources}
              renderItem = {({item})=>
                <Resource name={item.name} link={item.link} resourceId={item._id}/>    
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
     <View className=''>
        <Icon name="book-open-page-variant-outline" size={30} color="#c0576f" />
        <Text> No availeble material for this option</Text>
        <Text> You can try  searching</Text>
      </View>
    }
     
    </View>
  )
}

export default LectureNotes

const styles = StyleSheet.create({})