import { StyleSheet, Text, View } from 'react-native'
import React,{useCallback,useContext,useEffect,useState,useRef} from 'react'
import * as Keychain from 'react-native-keychain';
import { Spinner } from '../screens/Spinner';
import {AxiosContext} from '../components/context/AxiosContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const Profile = () => {
  const {publicAxios} = useContext(AxiosContext);
  const [status, setStatus] = useState('loading');
  const  profile  = useRef()


  const loadJWT = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();
      const jwt = JSON.parse(value.password);

      // authContext.setAuthState({
      //   accessToken: jwt.accessToken || null,
      //   refreshToken: jwt.refreshToken || null,
      //   authenticated: jwt.accessToken !== null,
      // });
      setStatus('success');
      const getProfile = ()=>{
        publicAxios.get(`profile-student/:${jwt.accessToken}`).
        then((response) => {
          console.log(response.data)
          profile.current = response.data.studentProfile
          console.log(profile.current)
        }).
        catch((err)=>{   
          if (axios.isAxiosError(err)) {
            console.error("Axios request failed", err.response?.data, err.toJSON());
          } else {
            console.error(err);
          }
    
        })
      }
     getProfile()
   
    } catch (error) {
      setStatus('error');
      console.log(`Keychain Error: ${error.message}`);
      // authContext.setAuthState({
      //   accessToken: null,
      //   refreshToken: null,
      //   authenticated: false,
      // });
    }
  }, []);

      useEffect(() => {
        loadJWT();
      });

      if (status === 'loading') {
        return <Spinner />;
   
  }

  return (
    <View>
      <Text>Profile</Text>
      <Icon name="check-all" size={300} color="#297373" />
      {/* <Text>Hello,{profile.current.matricnumber}</Text> */}
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})