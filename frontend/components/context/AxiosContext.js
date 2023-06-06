import React, {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';
import {AuthContext} from './AuthContext';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as Keychain from 'react-native-keychain';
import NetInfo from "@react-native-community/netinfo";
import InternetCheck from '../InternetCheck';

const AxiosContext = createContext();
const {Provider} = AxiosContext;

const AxiosProvider = ({children}) => {
  
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


  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: 'https://0b34-62-173-62-83.ngrok-free.app',
  });

  const publicAxios = axios.create({
    baseURL: "https://0b34-62-173-62-83.ngrok-free.app",
  });

  authAxios.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
        console.log(config.headers.Authorization)
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  const refreshAuthLogic = failedRequest => {
    const data = {
      refreshToken: authContext.authState.refreshToken,
    };

    const options = {
      method: 'POST',
      data,
      url: `https://0b34-62-173-62-83.ngrok-free.app/api/refreshToken`,
    };

    return axios(options)
      .then(async tokenRefreshResponse => {
        failedRequest.response.config.headers.Authorization =
          'Bearer ' + tokenRefreshResponse.data.accessToken;

        authContext.setAuthState({
          ...authContext.authState,
          accessToken: tokenRefreshResponse.data.accessToken,
        });

        await Keychain.setGenericPassword(
          'token',
          JSON.stringify({
            accessToken: tokenRefreshResponse.data.accessToken,
            refreshToken: authContext.authState.refreshToken,
          }),
        );

        return Promise.resolve();
      })
      .catch(e => {
        authContext.setAuthState({
          accessToken: null,
          refreshToken: null,
        });
      });
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}>
      {children}
           {/* internet check */}
      <InternetCheck isOffline={isOffline}/>
    </Provider>
  );
};

export {AxiosContext, AxiosProvider};