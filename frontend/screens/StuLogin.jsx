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
import Loader from './Loader';

export const storage = new MMKV()

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const StuLogin = ({navigation}) => {

  const [loading , setLoading] = useState(false)
  const validationerror = useRef('')

// details
 const [userType, setUsertype] = ('Student')
 const [userStatus, setUserStatus] = (storage.getString('user.userStatus') || false)
 const [bookmarks, setBookmarks] = (storage.getString('user.bookmarks') || [])

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
  
      if(password == '' || matricnumber == ''){
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
        storage.set('user.userType', userType)
        storage.set('user.userStatus', userStatus)
        storage.set('user.bookmarks', bookmarks)
     
        isOffline && setOfflineStatus(false);

        // setMatricnumber('')
        // setPassword('')
        
      }).
      catch((err)=>{   
        console.log(err)
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

         const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
            const offline = !(state.isConnected && state.isInternetReachable);
            setOfflineStatus(offline);
          });
           

          removeNetInfoSubscription();
          console.log(isOffline)
        }
        else{
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
    }
  }

  return (

    <View className="bg-bgcolor flex-1">
 
      {/* internet check */}
      <InternetCheck isOffline={isOffline} isRetry={handleLogin}/>
      {loading? <Loader/> : <></>}
      <View>

     {/* <View>
        <Image source={require('../assets/reading.png')} style={{width: '100%', height:250}} resizeMode="contain"/>
      </View> */}

{/* main content */}
      <View className='w-[90%] mx-auto' >
 
      <View className='pb-12 pt-10' >
      <Text className="font-ageoheavy text-4xl text-start text-main">Login</Text>
      </View>
      <View>
      {/* matric number */}
      <Text className='font-ageonormal  text-xl text-grey-800 p-0 m-0 '>Matric Number</Text>
      <TextInput className="font-ageonormal border border-main rounded-lg text-[20px] px-4 my-3 text-black  focus:border-orange" value={matricnumber.toString()} onChangeText={(text)=>setMatricnumber(text)}/>
      {/* password */}
      <View className='py-1'>
          <Text className='font-ageonormal  text-xl text-grey-800 p-0 m-0'>Password</Text>
          <TextInput className="font-ageonormal border border-main rounded-lg px-4 my-2 text-[20px]  text-black  focus:border-orange" name="password" 
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
            <Text className="text-lightmain text-xl font-ageomedium py-4 px-12">LOGIN</Text>
          </Pressable>
          <Text onPress={()=> navigation.navigate('ForgotPassword')}  className="text-[15px] pt-2 text-black text-center ">Forgot Password?</Text>

   
    </View>
        </View>
   
         </View>


      <View className=" absolute bottom-0  left-0 right-0 items-center p-4" >
          <Text className="font-ageobold text-xl text-main py-3 text-center">New Here??   
          <Text onPress={()=> navigation.navigate('SignUp')} className="font-ageobold text-xl underline px-4 text-black focus:text-main text-center"> Sign Up</Text>
          </Text>
        </View>

    </View>
  
  )
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
  logindownside: {
    position: 'absolute',
    bottom: windowHeight*0,
    left: 0,
    right: 0,
    alignItems: 'center',
    alignContent: 'center',
    paddingBottom: 4,
    justifyContent: 'center'
    // top: windowHeight*0,
    // height: Dimensions.get('window').height,
    // flex: 1,
    // justifyContent: 'flex-end',
  }
})