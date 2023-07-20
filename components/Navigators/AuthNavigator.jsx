import { createStackNavigator } from '@react-navigation/stack';

import Login from '../../screens/Login';
import Signup from '../../screens/Signup';
import RegistrationSuccess from '../../screens/RegistrationSuccess';
import ForgotPassword from '../../screens/ForgotPassword';
import RecoverPassword from '../../screens/RecoverPassword';
import PasswordRecoverySuccessful from '../../screens/PasswordRecoverySuccessful';
import StuLogin from '../../screens/StuLogin';
import LectLogin from '../../screens/LectLogin';
import StuSignup from '../../screens/StuSignup';
import LectSignup from '../../screens/LectSignup';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return(
    <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="SignUp" component={Signup} options={{headerShown: false}} />       
        <Stack.Screen name="StudentSignup" component={StuSignup} options={{headerShown: false}}/>
        <Stack.Screen name="LecturerSignup" component={LectSignup} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="StudentLogin" component={StuLogin} options={{headerShown: false}}/>
        <Stack.Screen name="LecturerLogin" component={LectLogin} options={{headerShown: false}}/>
        <Stack.Screen name="RegistrationSuccess" component={RegistrationSuccess} options={{headerShown: false}}/>   
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}}/>   
        <Stack.Screen name="RecoverPassword" component={RecoverPassword} options={{headerShown: false}}/>   
        <Stack.Screen name="PasswordRecoverySuccessful" component={PasswordRecoverySuccessful} options={{headerShown: false}}/>
    {/* <Stack.Screen name="Main" 
        component={TabNavigator} 
        options={{headerShown: false}}
        />   */}
    </Stack.Navigator>
  )
}

export default AuthNavigator