import { View, Text } from 'react-native'
import React,{useContext,useState,useCallback,useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './Navigators/TabNavigator';
import AuthNavigator from './Navigators/AuthNavigator';
import * as Keychain from 'react-native-keychain';
import { Spinner } from '../screens/Spinner';
import { AuthContext } from './context/AuthContext';

const Router = () => {
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState('loading');

  const loadJWT = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();
      const jwt = JSON.parse(value.password);

      authContext.setAuthState({
        accessToken: jwt.accessToken || null,
        refreshToken: jwt.refreshToken || null,
        authenticated: jwt.accessToken !== null,
      });
      setStatus('success');
     
    } catch (error) {
      setStatus('error');
      console.log(`Keychain Error: ${error.message}`);
      authContext.setAuthState({
        accessToken: null,
        refreshToken: null,
        authenticated: false,
      });
    }
  }, []);

      useEffect(() => {
        loadJWT();
      }, [loadJWT]);

      if (status === 'loading') {
        return <Spinner />;
      }
      if (authContext?.authState?.authenticated === false) {
        return (
            <NavigationContainer>
              <AuthNavigator/>
            </NavigationContainer>
        )}
        else{
          return(
            <NavigationContainer>
              <TabNavigator/>
            </NavigationContainer>
          )
        }
}


export default Router