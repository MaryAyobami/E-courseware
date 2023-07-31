import { StyleSheet, Text, View , Image, Dimensions,Pressable} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UploadSuccessful = ({navigation}) => {
  return (
    <SafeAreaView>
        <View className="h-screen bg-orange">
       <View className='flex justify-center items-center p-8'>
         <Icon name="check-all" size={300} color='#3d5a80'/>
       </View>
        <View className='w-[90%] mx-auto'> 
            <Text className="font-ageobold text-[27px] text-main text-center"> Academic Resource has been successfully uploaded!</Text>
         
        </View>
        </View>
        <Pressable style={styles.button}>
            <Text onPress={()=> navigation.navigate('LecturerView')} className="font-ageonormal border-2 border-main rounded-full px-6 py-4 text-[18px] text-orange1 bg-main focus:text-main">Proceed to check</Text>
            </Pressable>
    </SafeAreaView>
  )
}

export default UploadSuccessful

const styles = StyleSheet.create({
    button:{
        // flex:1,
        alignItems: "flex-end",
        // justifyContent: "flex-end"
        position: 'absolute',
        bottom: windowHeight*0,
        paddingBottom: 46,
        width: windowWidth - (windowWidth*0.1)
    }
})