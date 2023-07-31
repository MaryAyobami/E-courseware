import { StyleSheet, Text, View , FlatList , Dimensions, TouchableOpacity} from 'react-native'
import React from 'react'
import Resource from '../../components/Resource'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader2 from '../Loader2';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AR = ({navigation,route}) => {
    const {resources, currentlevel, currentAR }= route.params
    const resource = resources.current
    console.log(resources)
if (resource.length != 0){

  return (
    <View>

      <View style={styles.header}>
        <View className='h-full  bg-gray rounded-b-full w-screen'>
        <TouchableOpacity onPress={()=>navigation.goBack()} className='pl-4'>
          <Icon name='arrow-left' size={40} color='#3d5a80' />
      </TouchableOpacity>
        <Text className="text-[27px] font-ageobold text-main text-center  ">{currentlevel}'s {currentAR}</Text>
        </View>
          
        </View>

      <View className='w-[98%] mx-auto pt-12' >
      
      <FlatList
              data={resources.current}
              renderItem = {({item})=>
                <Resource res={item}/>    
              }
              keyExtractor={item => item._id}
              />
        
     </View>

    </View>
  )
            }
            else{
                return(
     <>
                    <View style={styles.header}>
                    <View className='h-full  bg-gray rounded-b-full w-screen'>
                    <TouchableOpacity onPress={()=>navigation.goBack()} className='pl-4'>
                      <Icon name='arrow-left' size={40} color='#3d5a80' />
                  </TouchableOpacity>
                    <Text className="text-[27px] font-ageobold text-main text-center  ">{currentlevel}'s {currentAR}</Text>
                    </View>
                      
                    </View>
                    <View className='flex-1 justify-center pb-40 items-center'>
                    <Icon name="book-open-page-variant-outline" size={120} color='#d3d3d3'/>
                    <Text className='font-ageobold text-lightmain text-center text-[27px]'>No resource was found for this selection.</Text>
                    <Text  className='font-ageonormal text-orange11 text-center text-[18px]'>Try <Text className='font-ageonormal text-orange11  underline text-center text-[18px]' onPress={()=> navigation.navigate('Search')}>searching</Text></Text>
                  </View>
                  
                  </>)
            }
}

export default AR

const styles = StyleSheet.create({

    header:{
        // backgroundColor: '#eaeaea',
        height: windowHeight/10,
        padding: 0,
    
    }
})