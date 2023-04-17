/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {AuthProvider} from './components/context/AuthContext';
import {AxiosProvider} from './components/context/AxiosContext';

const Root = () => {
    return (
      <AuthProvider>
        <AxiosProvider>
          <App />
        </AxiosProvider>
      </AuthProvider>
    );
  };

AppRegistry.registerComponent(appName, () => Root);
