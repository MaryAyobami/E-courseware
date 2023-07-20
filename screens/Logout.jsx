import { StyleSheet, Text, View,Button } from 'react-native'
import React,{useContext} from 'react'
import { AuthContext } from '../components/context/AuthContext'

const Logout = () => {

    const authContext = useContext(AuthContext);

  return (
    <View>
      <Text>Logout</Text>
      <Button title="Logout" onPress={() => authContext.logout()} />
    </View>
  )
}

export default Logout

const styles = StyleSheet.create({})