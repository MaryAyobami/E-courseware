import { SafeAreaView, StyleSheet, Text, View , TextInput, Pressable} from 'react-native'
import React,{useState} from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTogglePasswordVisibility } from '../components/hooks/useTogglePasswordVisibility';


const RecoverPassword = ({navigation}) => {

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
  useTogglePasswordVisibility();
  const [password, setPassword] = useState('')

  return (
    <SafeAreaView>
      <View className="w-screen h-screen bg-main">
         <View className='w-[90%] mx-auto'>
           <Text className='font-ageobold text-gray text-3xl text-center pt-20 pb-16'>Reset your Password</Text>
          <View>
          <TextInput className="font-ageonormal border border-gray rounded-full px-4 my-4 text-[20px]  text-gray" placeholder='New Password' name="password" 
          textContentType="newPassword"
          secureTextEntry={passwordVisibility}
          value={password}  
          autoCorrect={false} 
          enablesReturnKeyAutomatically
          onChangeText={text => setPassword(text)}
          />

          <Pressable onPress={handlePasswordVisibility} className='absolute top-6 right-4'>
              <Icon name={rightIcon} size={22} color="#E9D758" />
          </Pressable>
    </View>
    <View>
          <TextInput className="font-ageonormal border border-gray rounded-full px-4 my-4 text-[20px]  text-gray" placeholder='Confirm Password' name="password" 
          textContentType="newPassword"
          secureTextEntry={passwordVisibility}
          // value={password}  
          autoCorrect={false} 
          enablesReturnKeyAutomatically
          // onChangeText={text => setPassword(text)}
          />

          <Pressable onPress={handlePasswordVisibility} className='absolute top-6 right-4'>
              <Icon name={rightIcon} size={22} color="#E9D758" />
          </Pressable>
    </View>

    <Text onPress={()=> navigation.navigate('PasswordRecoverySuccessful')} className="font-ageomedium text-center border-2 border-main rounded-full px-6 py-4 my-4 text-[16px] text-main bg-orange focus:text-main ">Change Password</Text>
         </View>
      </View>
    </SafeAreaView>
  )
}

export default RecoverPassword
