import { StyleSheet, Text, View,ScrollView,FlatList } from 'react-native'
import React from 'react'
import Resource from '../../components/Resource'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LectureNotes = ({route,navigation}) => {
  const {resources,title} = route.params
  console.log(resources)
  return (
    <View className='bg-bgcolor h-screen w-screen'>
     <View className='h-24  w-screen justify-center items-center flex flex-row'> 
     <Icon name="book-open-page-variant-outline" size={30} color='#ee6c4d'  style={{paddingVertical:4}} onPress={()=> navigation.goBack()} />
       <Text className='p-4 text-center text-main font-ageobold text-4xl'>{title}s</Text>
     </View>
     {/* resources */}
     
    {
      resources.length? 
      <View className='w-[98%] mx-auto pt-8 ' >
      <FlatList
              data={resources}
              renderItem = {({item})=>
                <Resource res={item} />    
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
     <View className='flex-1 justify-center pb-40 items-center'>
        <Icon name="book-open-page-variant-outline" size={200} color='#ee6c4d' />
        <Text className='font-ageobold text-grey-800 text-center text-3xl'> No available material for this option</Text>
        <Text  className='font-ageonormal text-grey-800 text-center text-xl'> You can try <Text className='font-ageonormal  underline text-center text-xl' onPress={()=> navigation.navigate('Search')}>searching</Text></Text>
      </View>
    }
     
    </View>
  )
}

export default LectureNotes

const styles = StyleSheet.create({})