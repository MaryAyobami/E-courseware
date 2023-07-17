import { Pressable, StyleSheet, Text, View, Image , Dimensions} from 'react-native'
import React from 'react'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignUp = ({navigation}) => {

  return (
    <View className="h-screen w-screen bg-bgcolor">
       <View style={styles.imageContainer}>
        <Image source={require('../assets/logo.png')} style={{width: '100%', height:'85%'}} resizeMode="contain"/>
      </View>
      
      <View className="bg-main h-full rounded-tl-[100px] pt-6">
      <View className='items-center'>
      <Text className="font-ageoheavy text-[27px] text-start text-bgcolor ">SignUp</Text>
         <View className='w-[95%] mx-auto text-center justify-center items-center h-[300px]'>
          <Pressable onPress={()=> navigation.navigate('StudentSignup') }className='py-4 w-[70%]  rounded-full border bg-bgcolor border-lightmain  '><Text className='font-ageomedium text-[16px] text-center text-main'> Student</Text></Pressable>
          <Text className='my-2'></Text>
          <Pressable onPress={()=> navigation.navigate('LecturerSignup')} className='py-4 w-[70%]  rounded-full border bg-bgcolor border-lightmain  '><Text className='font-ageomedium text-[16px] text-center text-main'> Lecturer </Text></Pressable>
         </View>
        
      <Pressable style={styles.button}>
      <Text className="font-ageonormal text-[16px] py-3 text-center  text-lightmain">Have an account?   
          <Text onPress={()=> navigation.navigate('Login')} className="font-ageonormal text-[16px] underline px-4 text-orange">Log in</Text>
          </Text>
      </Pressable>
      </View>

   

      </View>
    </View>
  )
}

export default SignUp

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
     bottom:0,
   //  paddingBottom: 46,
    width: windowWidth - (windowWidth*0.1),
    textAlign: 'center'
}
})