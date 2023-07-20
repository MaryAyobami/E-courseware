import { ScrollView, StyleSheet, Text, Dimensions, TextInput, View,Image, Pressable, TouchableOpacity , } from 'react-native'
import React,{useState, useRef, useEffect, useContext} from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTogglePasswordVisibility } from '../components/hooks/useTogglePasswordVisibility';
import axios from 'axios';
import { showMessage, hideMessage } from "react-native-flash-message";
import {AuthContext} from '../components/context/AuthContext';
import * as Keychain from 'react-native-keychain';
import {AxiosContext} from '../components/context/AxiosContext';
import NetInfo from "@react-native-community/netinfo";
import InternetCheck from '../components/InternetCheck';
import { MMKV } from 'react-native-mmkv'
import Loader from './Loader';



const LectLogin = ({navigation}) => {

  const [loading , setLoading] = useState(false)
  const validationerror = useRef('')

  // login details
  const [email, setEmail] = useState('')
  //const [matricnumber, setMatricnumber] = useState('')
// password visibility
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
  useTogglePasswordVisibility();
  const [password, setPassword] = useState('')

  const authContext = useContext(AuthContext);
  const {publicAxios} = useContext(AxiosContext);
  const lecturerData = useRef()

    // internet check
  const [isOffline, setOfflineStatus] = useState(false);



  // handle login

    const handleLecturerLogin = async ()=>{
      try{
            
            if(password == '' || email == ''){
              showMessage({
                message: `The input fileds cannot be empty!`,
                  type: "danger",
                  backgroundColor: '#3b2e2a',
                  titleStyle: {
                    fontFamily:"tilda-sans_medium",
                    color:'#f8f1e9',
                    fontSize: 16,
                    padding: 4
                  },
              })

              // setEmail('')
              // setPassword('')
            }

           else{
            setLoading(true)
            const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
              const offline = !(state.isConnected && state.isInternetReachable);
              setOfflineStatus(offline);
            });
          
            removeNetInfoSubscription();
           await publicAxios.post(`/api/login-lecturer`,{
              email, 
              password,
            }).
            then((response) => {
              // if(response.status == 200){
              //    navigation.navigate('Main')
              // }
              const {lecturer} = response.data
              lecturerData.current = lecturer
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
              
              // save to phone local storage
              storage.set('user.name', lecturerData.current.name)
              storage.set('user.email', lecturerData.current.email)
              storage.set('user.department', lecturerData.current.department)

              isOffline && setOfflineStatus(false);

              setEmail('')
              setPassword('')
            }).
            catch((err)=>{   
              if (axios.isAxiosError(err)) {
                    validationerror.current = err.response.data
                    console.error(validationerror.current)
                    showMessage({
                      message: `${validationerror.current}`,
                        type: "danger",
                    })
                  setEmail('')
                  setPassword('')
               console.error("Axios request failed", err.response?.data, err.toJSON());
              } else {
                console.error(err);
              }
        
            }).finally(()=>setLoading(false))
           }
      }
     catch(e){
      
     }
    }

  return (
    <View className="h-screen flex-1 bg-bgcolor">

      <InternetCheck isOffline={isOffline} isRetry={handleLogin}/>

      {loading? <Loader/> : <></>}
      <View>
      

    {/* main content */}
          <View className='w-[90%] mx-auto' >
    
          <View className='pb-12 pt-10' >
          <Text className="font-ageoheavy text-[27px] text-start text-main">Login</Text>
          </View>
          <View>
          {/* matric number */}
          <Text className='font-ageonormal  text-[18px] text-grey-800 p-0 m-0 '>Email</Text>
          <TextInput className="font-ageonormal border border-main  rounded-lg text-[20px] px-4 my-3 text-black  focus:border-orange"  onChangeText={(text)=>setEmail(text)}/>
          {/* password */}
          <View>
          <Text className='font-ageonormal  text-[18px] text-grey-800 p-0 m-0 '>Password</Text>
              <TextInput className="font-ageonormal border border-main rounded-lg px-4 my-2 text-[20px]  text-black  focus:border-orange"  name="password" 
              textContentType="newPassword"
              secureTextEntry={passwordVisibility}
              value={password}  
              autoCorrect={false} 
              enablesReturnKeyAutomatically
              onChangeText={text => setPassword(text)}
              />

              <Pressable onPress={handlePasswordVisibility} className='absolute top-2 right-4'>
                  <Icon name={rightIcon} size={22} color="#ee6c4d"/>
              </Pressable>
        </View>
      
      
      
              <Pressable className="items-center rounded-lg mt-6 bg-main" onPress={handleLecturerLogin} >
      
                <Text className="text-lightmain text-[18px] font-ageomedium py-4 px-12">LOGIN</Text>
           
              </Pressable>
      

              <Text onPress={()=> navigation.navigate('ForgotPassword')}  className="text-[15px] pt-2 text-grey text-center ">Forgot Password?</Text>

        
        </View>
       
                
            </View>
        </View>
        <View className="absolute bottom-0 left-0 right-0 items-center p-4">
              <Text className="font-ageobold text-[18px] text-main py-3">New Here??   
              <Text onPress={()=> navigation.navigate('SignUp')} className="font-ageobold text-[18px] underline px-4 text-black focus:text-main">Sign Up</Text>
              </Text>
            </View>
    </View>
  )
}

export default LectLogin

const styles = StyleSheet.create({

  indicator: {
    backgroundColor: '#e0fbfc',
    height: Dimensions.get('window').height,
    opacity: 0.5,
  },

})