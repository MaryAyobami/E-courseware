import { ScrollView, StyleSheet, Text, TextInput, View,Image, Pressable , TouchableOpacity ,ActivityIndicator, Dimensions } from 'react-native'
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
import Loader from './Loader';
import messaging from '@react-native-firebase/messaging';

export const storage = new MMKV()

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const StuLogin = ({navigation,route}) => {
   const {user} = route.params
 
  const [loading , setLoading] = useState(false)
  const validationerror = useRef('')

// details
 const userType = useRef(JSON.stringify(user))
 console.log(user)
 console.log(userType.current)
 
 const [userStatus, setUserStatus] = useState(storage.getString('user.userStatus') || false)
 const [bookmarks, setBookmarks] = useState(storage.getString('user.bookmarks') || [])

// login details
  const [email, setEmail] = useState('')
  const [matricnumber, setMatricnumber] = useState('')
// password visibility
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  const [password, setPassword] = useState('')

  const authContext = useContext(AuthContext);
  const {publicAxios} = useContext(AxiosContext);
  const studentData = useRef()
  const lecturerData = useRef()
  
  // internet check
  const [isOffline, setOfflineStatus] = useState(false);
  // useEffect(() => {
  //   const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
  //     const offline = !(state.isConnected && state.isInternetReachable);
  //     setOfflineStatus(offline);
  //   });
  //  console.log('testing')
  //  console.log(isOffline)
  //   removeNetInfoSubscription();
  // },[]);


  // handle login

    const handleLogin = async()=>{

      try{
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();

      if(password === '' || matricnumber === ''){
          showMessage({
            message: `The input fields cannot be empty!`,
              type: "default",
              backgroundColor: '#3b2e2a',
            titleStyle: {
              fontFamily:"tilda-sans_medium",
              color:'#f8f1e9',
              fontSize: 16,
              padding: 4
            },
          })

          // setMatricnumber('')
          // setPassword('')
        }
      else{
        setLoading(true)
        
        console.log(matricnumber,password)
        // send request
        await publicAxios.post(`/api/login-student`,{
        matricnumber, 
        password,
        token
      }).
      then((response) => {
        // if(response.status == 200){
        //    navigation.navigate('Main')
        // }
        console.log(response)
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
        storage.set('user.userType', userType.current)
        // storage.set('user.userStatus', userStatus)
        // storage.set('user.bookmarks', bookmarks)
       
     

      }).
      catch((err)=>{   
        console.log(err)
        setLoading(false)
        if (err.response.status == 400 ) {
          validationerror.current = err.response.data
          console.error(validationerror.current)
          showMessage({
            message:`${validationerror.current}`,
              type: "default",
              backgroundColor:  '#ee6c4d',
            titleStyle: {
              fontFamily:"tilda-sans_medium",
              color:'#f8f1e9',
              fontSize: 16,
              padding: 4
            },
          })
      
        }
        else if(err.request) {
         setLoading(false)
         const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
            const offline = !(state.isConnected && state.isInternetReachable);
            setOfflineStatus(offline);
          });
           

          removeNetInfoSubscription();
          console.log(isOffline)
        }
        else{
          setLoading(false)
          showMessage({
            message: `An error has occured, please try again!`,
              type: "default",
              backgroundColor:  '#ee6c4d',
            titleStyle: {
              fontFamily:"tilda-sans_medium",
              color:'#f8f1e9',
              fontSize: 16,
              padding: 4
            },
          })
        }
        
  
      })
      .finally(()=>setLoading(false))
      }

    }
    catch(e){
      console.log(e)
      setLoading(false)
      showMessage({
        message: `An error has occured, please try again!`,
          type: "default",
          backgroundColor:  '#ee6c4d',
        titleStyle: {
          fontFamily:"tilda-sans_medium",
          color:'#f8f1e9',
          fontSize: 16,
          padding: 4
        },
      })
    }
  }


  // handle login

  const handleLecturerLogin = async ()=>{
    try{
          
          if(password === '' || email === ''){
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
            console.log(lecturerData.current)
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
            storage.set('user.department', lecturerData.current.department[0])
            storage.set('user.userType', userType.current)
            // storage.set('user.userStatus', userStatus)
            // storage.set('user.bookmarks', bookmarks)
         

            

          }).
          catch((err)=>{   
            console.log(err)
            setLoading(false)
            if (err.response.status == 400 ) {
              validationerror.current = err.response.data
              console.error(validationerror.current)
              showMessage({
                message:`${validationerror.current}`,
                  type: "default",
                  backgroundColor:  '#ee6c4d',
                titleStyle: {
                  fontFamily:"tilda-sans_medium",
                  color:'#f8f1e9',
                  fontSize: 16,
                  padding: 4
                },
              })
          
            }
            else if(err.request) {
              setLoading(false)
             const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
                const offline = !(state.isConnected && state.isInternetReachable);
                setOfflineStatus(offline);
              });
               
    
              removeNetInfoSubscription();
              console.log(isOffline)
            }
            else{
              setLoading(false)
              showMessage({
                message: `An error has occured, please try again!`,
                  type: "default",
                  backgroundColor:  '#ee6c4d',
                titleStyle: {
                  fontFamily:"tilda-sans_medium",
                  color:'#f8f1e9',
                  fontSize: 16,
                  padding: 4
                },
              })
            }
          
      
          }).finally(()=>setLoading(false))
         }
    }
   catch(e){
    console.log(e)
    setLoading(false)
    showMessage({
      message: `An error has occured, please try again!`,
        type: "default",
        backgroundColor:  '#ee6c4d',
      titleStyle: {
        fontFamily:"tilda-sans_medium",
        color:'#f8f1e9',
        fontSize: 16,
        padding: 4
      },
    })
  }
  
}
  

  if(user=='Student'){
        return (

          <View className="bg-bgcolor h-screen">
      
            {/* internet check */}
            <InternetCheck isOffline={isOffline} isRetry={handleLogin}/>
            {loading? <Loader/> : <></>}
            <View>

          {/* <View>
              <Image source={require('../assets/reading.png')} style={{width: '100%', height:250}} resizeMode="contain"/>
            </View> */}

      {/* main content */}
            <View className='w-[90%] mx-auto' >
      
            <View className='pb-12 pt-6' >
            <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Icon name='arrow-left' size={40} color='#ee6c4d' />
           </TouchableOpacity>
            <Text className="font-ageoheavy pt-4 text-[27px] text-start text-main">Login</Text>
            </View>
      
            <View>
            {/* matric number */}
            <Text className='font-ageonormal  text-[16px] text-grey-800 p-0 m-0 '>Matric Number</Text>
            <TextInput className="font-ageonormal border border-main rounded-lg text-[16px] px-4 my-3 text-black  focus:border-orange" value={matricnumber.toString()} onChangeText={(text)=>setMatricnumber(text)}/>
            {/* password */}
            <View className='py-1'>
                <Text className='font-ageonormal  text-[16px] text-grey-800 p-0 m-0'>Password</Text>
                <TextInput className="font-ageonormal border border-main rounded-lg px-4 my-2 text-[16px]  text-black  focus:border-orange" name="password" 
                textContentType="newPassword"
                secureTextEntry={passwordVisibility}
                value={password.toString()}  
                autoCorrect={false} 
                enablesReturnKeyAutomatically
                onChangeText={text => setPassword(text)}
                />

                <Pressable onPress={handlePasswordVisibility} className='absolute top-2 right-4'>
                    <Icon name={rightIcon} size={22} color="#ee6c4d" />
                </Pressable>
          </View>
          </View>

          {/* login  */}
          <View className='py-1'>
            
          <Pressable className="items-center rounded-lg mt-6 bg-main" onPress={handleLogin} >
                  <Text className="text-lightmain text-[16px] font-ageomedium py-4 px-12">LOGIN</Text>
                </Pressable>
                <Text onPress={()=> navigation.navigate('ForgotPassword')}  className="text-[15px] pt-2 text-black text-center ">Forgot Password?</Text>

        
          </View>
              </View>
        
              </View>


            <View className="justify-end items-center p-4" >
              <View className='justify-end'>
              <Text className="font-ageobold text-[16px] text-main py-3 text-center">New Here??   
                <Text onPress={()=> navigation.navigate('SignUp')} className="font-ageobold text-[16px] underline px-4 text-black focus:text-main text-center"> Sign Up</Text>
                </Text>
              </View>
              
              </View>

          </View>
        
        )
   }

  else if(user == 'Lecturer'){
    return (
      <View className="h-screen flex-1 bg-bgcolor">
  
        <InternetCheck isOffline={isOffline} isRetry={handleLecturerLogin}/>
  
        {loading? <Loader/> : <></>}
        <View>
        
  
      {/* main content */}
            <View className='w-[90%] mx-auto' >
      
            <View className='pb-12 pt-6' >
            <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Icon name='arrow-left' size={40} color='#ee6c4d' />
          </TouchableOpacity>
            <Text className="font-ageoheavy pt-4 text-[27px] text-start text-main">Login</Text>
            </View>
            <View>
            {/* matric number */}
            <Text className='font-ageonormal  text-[16px] text-grey-800 p-0 m-0 '>Email</Text>
            <TextInput className="font-ageonormal border border-main  rounded-lg text-[20px] px-4 my-3 text-black  focus:border-orange"  onChangeText={(text)=>setEmail(text)}/>
            {/* password */}
            <View>
            <Text className='font-ageonormal  text-[16px] text-grey-800 p-0 m-0 '>Password</Text>
                <TextInput className="font-ageonormal border border-main rounded-lg px-4 my-2 text-[20px]  text-black  focus:border-orange"  name="password" 
                textContentType="newPassword"
                secureTextEntry={passwordVisibility}
                value={password}  
                autoCorrect={false} 
                enablesReturnKeyAutomatically
                onChangeText={text => setPassword(text)}
                />
  
                <Pressable onPress={handlePasswordVisibility} className='absolute top-0 right-4'>
                    <Icon name={rightIcon} size={22} color="#ee6c4d"/>
                </Pressable>
          </View>
        
        
        
                <Pressable className="items-center rounded-lg mt-6 bg-main" onPress={handleLecturerLogin} >
        
                  <Text className="text-lightmain text-[16px] font-ageomedium py-4 px-12">LOGIN</Text>
             
                </Pressable>
        
  
                <Text onPress={()=> navigation.navigate('ForgotPassword')}  className="text-[15px] pt-2 text-grey text-center ">Forgot Password?</Text>
  
          
          </View>
         
                  
              </View>
          </View>
          <View className="absolute bottom-0 left-0 right-0 items-center p-4">
                <Text className="font-ageobold text-[16px] text-main py-3">New Here??   
                <Text onPress={()=> navigation.navigate('SignUp')} className="font-ageobold text-[16px] underline px-4 text-black focus:text-main">Sign Up</Text>
                </Text>
              </View>
      </View>
    )
  }
}

export default StuLogin

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: '#e0fbfc',
    height: Dimensions.get('window').height,
    opacity: 0.5,
  },

  flashmessage: {
    fontFamily:"GalanoClassicAltRegular",
    color:'#f8f1e9',
    fontSize: 16,
    padding: 4
  },
  // logindownside: {
  //   position: 'absolute',
  //   bottom: windowHeight*0,
  //   left: 0,
  //   right: 0,
  //   alignItems: 'center',
  //   alignContent: 'center',
  //   paddingBottom: 4,
  //   justifyContent: 'center'
  //   // top: windowHeight*0,
  //   // height: Dimensions.get('window').height,
  //   // flex: 1,
  //   // justifyContent: 'flex-end',
  // }
})