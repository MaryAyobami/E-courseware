import { StyleSheet, Text, View ,Dimensions} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Header = (props) => {

  return (
    <View style={styles.header}>
        <View className='h-full flex flex-row  pt-2'>
            <TouchableOpacity onPress={props.open}>
            <Icon name="reorder-horizontal" size={35} color='#297373'  />
            </TouchableOpacity> 
        <Text className="text-4xl font-ageobold text-green text-center flex-1">{props.name}</Text>
        </View>
          
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header:{
        backgroundColor: '#fff',
        height: windowHeight/14.5,
        padding: 4,

    }
})