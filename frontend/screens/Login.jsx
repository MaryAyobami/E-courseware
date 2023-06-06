import { Pressable, StyleSheet, Text, View, Image , Dimensions} from 'react-native'
import React from 'react'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = ({navigation}) => {

  
  return (
    <View className="h-screen w-screen bg-bgcolor">
       <View style={styles.imageContainer}>
        <Image source={require('../assets/logo.png')} style={{width: '100%', height:'85%'}} resizeMode="contain"/>
      </View>
      
      <View className="bg-main h-full rounded-tl-[100px] pt-6 ">
      <View className='items-center '>
      <Text className="font-ageoheavy text-4xl text-start text-bgcolor ">Login</Text>
         <View className='w-[95%] mx-auto text-center justify-center items-center h-[300px]'>
          <Pressable onPress={()=> navigation.navigate('StudentLogin')} className='py-4 w-[70%]  border bg-bgcolor border-lightmain rounded-full '><Text className='font-ageomedium text-xl text-center text-main '> Student</Text></Pressable>
          <Text className='my-2'></Text>
          <Pressable onPress={()=> navigation.navigate('LecturerLogin')} className='py-4 w-[70%]  bg-bgcolor border border-lightmain  rounded-full '><Text className='font-ageomedium text-xl text-main text-center '> Lecturer </Text></Pressable>
         </View>
        
      <Pressable style={styles.button}>
      <Text className="font-ageonormal text-xl py-3 text-lightmain text-center">Don't have an account?   
          <Text onPress={()=> navigation.navigate('SignUp')} className="font-ageonormal text-xl underline px-4 text-orange"> Sign Up</Text>
          </Text>
      </Pressable>
      </View>

   

      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  imageContainer:{
    height: windowHeight/2.8,
    paddingTop: 20,
    paddingLeft: 20
  },
  button:{
    // flex:1,
  
    position: 'absolute',
     //bottom: windowHeight*0,
     bottom: 0,
   //  paddingBottom: 46,
    width: windowWidth - (windowWidth*0.1),
    textAlign: 'center'
}
})