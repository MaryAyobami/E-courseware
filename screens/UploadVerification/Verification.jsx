import { StyleSheet, Text, TouchableOpacity, Dimensions,View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Verification = ({navigation}) => {
  return (
    <View className='bg-bgcolor h-screen'>

    <View style={styles.header}>
            <View className='h-full  bg-gray rounded-b-full w-screen'>
            <TouchableOpacity onPress={()=>navigation.goBack()} className='pl-4'>
              <Icon name='arrow-left' size={40} color='#3d5a80' />
          </TouchableOpacity>
            <Text className="text-[27px] font-ageobold text-main text-center  ">Verification</Text>
            </View>
          
        </View>
      <View className='w-[98%] mx-auto pt-8'>
        <Text className='text-[16px] w-[98%] mx-auto font-ageonormal text-justify'>To upload academic resources, you need to verify that you're a student. Choose one of the options below to continue.
        </Text>
      
          <View className='pt-8'>
            <TouchableOpacity className='bg-main h-40 rounded-lg flex flex-row p-2 my-2' onPress={()=>navigation.navigate("ID Card Verification")}>
              <View className='bg-blue w-[20%] h-[70%] ml-4 mt-4 rounded-full '>
                 <Text className='text-6xl font-ageoheavy p-4 text-center flex items-center justify-center text-main '>1</Text>
              </View>
              <View className='absolute bottom-0 right-0'>
              <Text className='text-[25px] font-ageomedium text-bgcolor p-4 '>Upload Student ID Card</Text>
              </View>
             
            </TouchableOpacity>

            <TouchableOpacity className='bg-main h-40 rounded-lg flex flex-row p-2 my-2 mt-4' onPress={()=>navigation.navigate("Instructor's Approval")}>
              <View className='bg-blue w-[20%] h-[70%] ml-4 mt-4 rounded-full '>
                 <Text className='text-6xl font-ageoheavy p-4 text-center flex items-center justify-center text-main '>2</Text>
              </View>
              <View  className='absolute bottom-0 right-0'>
              <Text className='text-[25px] font-ageomedium text-bgcolor p-4'>Instructor/Lecturer's Approval</Text>
              </View>
             
            </TouchableOpacity>
          </View>
      </View>
    </View>
  )
}

export default Verification

const styles = StyleSheet.create({
  header:{
    // backgroundColor: '#eaeaea',
    height: windowHeight/10,
    padding: 0,

},
})