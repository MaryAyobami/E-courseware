import { StyleSheet, Text, View , Image, Dimensions,Pressable} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const VerificationSuccessful = ({navigation}) => {
  return (
        <View className="flex-1 bg-orange">
       <View className='flex-1 justify-center items-center p-8'>
         <Icon name="check-all" size={300} color='#3d5a80'/>
       </View>
        <View className='w-[90%] justify-center align-middle items-center mx-auto '> 
            <Text className="font-ageobold text-[28px] text-main text-center">Verfication Successful!</Text>
         
        </View>


        <Pressable style={styles.button} >
            <Text onPress={()=> navigation.navigate('Upload')} className="font-ageonormal border-2 border-orange1 rounded-full px-6 py-4 text-[18px] text-darkmain bg-gray focus:text-darkmain">Proceed to Upload</Text>
            </Pressable>
        </View>
        
    
  )
}

export default VerificationSuccessful

const styles = StyleSheet.create({
    button:{
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 12,
      alignContent:'flex-end',
      alignItems: 'flex-end',
      marginRight:8
    }
})