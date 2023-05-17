import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Keyboard, Pressable} from 'react-native'
import React from 'react'
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const SearchGroup = ({navigation}) => {
  return (
    <View className='w-screen h-screen'> 


    <View className='flex flex-row '>
      <View className='bg-gray w-[35%] h-screen p-4'>
   
        <Text className='text-green font-ageobold text-xl mt-6 text-center '>Academic Libraries</Text>
          <View className="flex-1">
            
                 <View className='text-center mt-20'>
                    <TouchableOpacity>
                      <Text className='text-grey-800 text-center font-ageonormal text-[16px]'>JSTOR</Text>
                    </TouchableOpacity>
                  </View>

                  <View className='text-center my-6'>
                    <TouchableOpacity>
                      <Text className='text-grey-800 text-center font-ageonormal text-[16px]'>GOOGLE BOOK</Text>
                    </TouchableOpacity>
                  </View>

                  <View className='text-center my-6'>
                    <TouchableOpacity>
                      <Text className='text-grey-800 text-center font-ageonormal text-[16px]'>GOOGLE SCHOLAR</Text>
                    </TouchableOpacity>
                  </View>

                  <View className='text-center my-6'>
                    <TouchableOpacity>
                      <Text className='text-grey-800 text-center font-ageonormal text-[16px]'>REFSEEK</Text>
                    </TouchableOpacity>
                  </View>

                  <View className='text-center my-6'>
                    <TouchableOpacity>
                      <Text className='text-grey-800 text-center font-ageonormal text-[16px]'>RESEARCH GATE</Text>
                    </TouchableOpacity>
                  </View>

      </View>
      </View>
         
         <Pressable    className=' flex flex-row justify-between border text-center border-green p-4 items-center rounded-full h-[8%] w-[60%] my-6 mx-auto'       
          onPress={() => {
          navigation.navigate('SearchScreen');
          }}>
            
                {/* search Icon */}
                <Text className='text-xl font-ageonormal  h-full'>
                  Search...
                </Text>
                    <Icon
                    name="magnify"
                    size={35}
                    color="#297373"
                    style={{ 
                   
                      height: '100%'
                      
                    }}
                    />
                
                  
         
         </Pressable>
          

    </View>
    </View>
  )
}

export default SearchGroup

const styles = StyleSheet.create({})