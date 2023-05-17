import { ScrollView, StyleSheet, Text, TextInput, View,Image, Pressable , ActivityIndicator, Dimensions } from 'react-native'
import React,{useState, useRef, useEffect, useContext} from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTogglePasswordVisibility } from '../components/hooks/useTogglePasswordVisibility';
import axios from 'axios';
import { showMessage, hideMessage } from "react-native-flash-message";
import {AuthContext} from '../components/context/AuthContext';
import * as Keychain from 'react-native-keychain';
import {AxiosContext} from '../components/context/AxiosContext';
import { MMKV } from 'react-native-mmkv'
import NetInfo from "@react-native-community/netinfo";
import InternetCheck from '../components/InternetCheck';


export const storage = new MMKV()

const StuLogin = ({navigation}) => {

  const [loading , setLoading] = useState(false)
  const validationerror = useRef('')

  // login details
  const [email, setEmail] = useState('')
  const [matricnumber, setMatricnumber] = useState('')
// password visibility
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
  useTogglePasswordVisibility();
  const [password, setPassword] = useState('')

  const authContext = useContext(AuthContext);
  const {publicAxios} = useContext(AxiosContext);
  const studentData = useRef()

  // internet check
  const [isOffline, setOfflineStatus] = useState(false);
  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });
   console.log('testing')
   console.log(isOffline)
    removeNetInfoSubscription();
  },[]);


  // handle login

    const handleLogin = async()=>{

      try{
  
      if(password == '' || matricnumber == ''){
          showMessage({
            message: `The input fields cannot be empty!`,
              type: "default",
              backgroundColor: '#732955',
            titleStyle: {
              fontFamily:"tilda-sans_medium",
              color:'#DFF0EB',
              fontSize: 16,
              padding: 4
            },
          })

          setMatricnumber('')
          setPassword('')
        }
      else{
        setLoading(true)
        await publicAxios.post(`/api/login-student`,{
        matricnumber, 
        password,
      }).
      then((response) => {
        // if(response.status == 200){
        //    navigation.navigate('Main')
        // }
        const {student} = response.data
        studentData.current = student
        const {accessToken, refreshToken} = response.data;
        authContext.setAuthState({
          accessToken,
          refreshToken,
          authenticated: true,
        });
       
        Keychain.setGenericPassword(
          'token',
          JSON.stringify({
            accessToken,
            refreshToken,
          }),
        );
        storage.set('user.name', studentData.current.name)
        storage.set('user.level', studentData.current.level)
        storage.set('user.email', studentData.current.email)
        storage.set('user.department', studentData.current.department)
        storage.set('user.matricnumber', studentData.current.matricnumber)
     
        isOffline && setOfflineStatus(false);

        setMatricnumber('')
        setPassword('')
        
      }).
      catch((err)=>{   
        if (axios.isAxiosError(err)) {
              validationerror.current = err.response.data
              console.error(validationerror.current)
              showMessage({
                message: `${validationerror.current}`,
                  type: "default",
                  titleStyle: {
                    fontFamily:"GalanoClassicAltRegular",
                    color:'#DFF0EB',
                    fontSize: 16,
                    padding: 4
                  },
                 backgroundColor: '#732955',
                 color:'#DFF0EB',
              })

              setMatricnumber('')
              setPassword('')
            
         console.error("Axios request failed", err.response?.data, err.toJSON());
        } else {
          console.error(err);
        }
  
      })
      .finally(()=>setLoading(false))
      }

    }
    catch(e){
      console.log(e)
    }
  }

  return (

    <View className="h-screen bg-white">
      {/* internet check */}
      <InternetCheck isOffline={isOffline}/>

      {loading? <ActivityIndicator size="large" style={styles.indicator} color={'#FF8552'} />: 
      <View>

     <View>
        <Image source={require('../assets/reading.png')} style={{width: '100%', height:250}} resizeMode="contain"/>
      </View>

{/* main content */}
      <View className='w-[90%] mx-auto' >
 
      <View className='pb-8' >
      <Text className="font-ageoheavy text-4xl text-start text-green">Login</Text>
      </View>
      <View>
      {/* matric number */}
      <TextInput className="font-ageonormal border border-green rounded-full text-[20px] px-4 my-3 text-black" placeholder='Matric number' value={matricnumber.toString()} onChangeText={(text)=>setMatricnumber(text)}/>
      {/* password */}
      <View>
          <TextInput className="font-ageonormal border border-green rounded-full px-4 my-2 text-[20px]  text-black" placeholder='Password' name="password" 
          textContentType="newPassword"
          secureTextEntry={passwordVisibility}
          value={password.toString()}  
          autoCorrect={false} 
          enablesReturnKeyAutomatically
          onChangeText={text => setPassword(text)}
          />

          <Pressable onPress={handlePasswordVisibility} className='absolute top-6 right-4'>
              <Icon name={rightIcon} size={22} color="#297373" />
          </Pressable>
    </View>
   
   
     <Pressable className="items-center rounded-full mt-4 bg-green" onPress={handleLogin} >
            <Text className="text-gray text-xl font-ageomedium py-4 px-12">LOGIN</Text>
          </Pressable>
          <Text onPress={()=> navigation.navigate('ForgotPassword')}  className="text-[15px] pt-2 text-grey text-center ">Forgot Password?</Text>

     
     </View>
      <View className=" flex  items-center p-4">
          <Text className="font-ageobold text-xl text-green py-3">New Here??   
          <Text onPress={()=> navigation.navigate('SignUp')} className="font-ageobold text-xl underline px-4 text-black focus:text-green">Sign Up</Text>
          </Text>
         </View>
        </View>
         </View>
}
    </View>
  
  )
}

export default StuLogin

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: '#DFF0EB',
    height: Dimensions.get('window').height,
  },

  flashmessage: {
    fontFamily:"GalanoClassicAltRegular",
    color:'#DFF0EB',
    fontSize: 16,
    padding: 4
  }
})