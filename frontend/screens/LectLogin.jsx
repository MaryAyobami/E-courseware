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

export const storage = new MMKV()
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

    const handleLogin = ()=>{
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
            publicAxios.post(`/api/login-lecturer`,{
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
        
            })
           }
      }
     catch(e){
      console.log(e)
     }
    }

  return (
    <View className="h-screen bg-bgcolor">

      <InternetCheck isOffline={isOffline}/>

      {loading? <ActivityIndicator size="large" style={styles.indicator} color={'#ee6c4d'} />: 
      <View>
        <View>
            <Image source={require('../assets/logo.png')} style={{width: '100%', height:250}} resizeMode="contain"/>
          </View>

    {/* main content */}
          <View className='w-[90%] mx-auto' >
    
          <View className='pb-8' >
          <Text className="font-ageoheavy text-4xl text-start text-main">Login</Text>
          </View>
          <View>
          {/* matric number */}
          <Text className='font-ageonormal  text-xl text-grey-800 p-0 m-0 '>Email</Text>
          <TextInput className="font-ageonormal border border-main  rounded-lg text-[20px] px-4 my-3 text-black  focus:border-orange"  onChangeText={(text)=>setEmail(text)}/>
          {/* password */}
          <View>
          <Text className='font-ageonormal  text-xl text-grey-800 p-0 m-0 '>Password</Text>
              <TextInput className="font-ageonormal border border-main rounded-lg px-4 my-2 text-[20px]  text-black  focus:border-orange"  name="password" 
              textContentType="newPassword"
              secureTextEntry={passwordVisibility}
              value={password}  
              autoCorrect={false} 
              enablesReturnKeyAutomatically
              onChangeText={text => setPassword(text)}
              />

              <Pressable onPress={handlePasswordVisibility} className='absolute top-6 right-4'>
                  <Icon name={rightIcon} size={22} color="#ee6c4d"/>
              </Pressable>
        </View>
      
      
      
              <Pressable className="items-center rounded-lg mt-4 bg-main" onPress={handleLogin} >
              <TouchableOpacity>
                <Text className="text-gray text-xl font-ageomedium py-4 px-12">LOGIN</Text>
                </TouchableOpacity>
              </Pressable>
      

              <Text onPress={()=> navigation.navigate('ForgotPassword')}  className="text-[15px] pt-2 text-grey text-center ">Forgot Password?</Text>

        
        </View>
          <View className=" flex  items-center p-4">
              <Text className="font-ageobold text-xl text-main py-3">New Here??   
              <Text onPress={()=> navigation.navigate('SignUp')} className="font-ageobold text-xl underline px-4 text-black focus:text-main">Sign Up</Text>
              </Text>
            </View>
      
                
            </View>
        </View>
        }
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