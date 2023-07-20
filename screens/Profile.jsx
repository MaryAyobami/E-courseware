import { StyleSheet, Text, View ,Image, Dimensions, TouchableOpacity, ScrollView} from 'react-native'
import React,{useCallback,useContext,useEffect,useState,useRef} from 'react'
import * as Keychain from 'react-native-keychain';
import { Spinner } from '../screens/Spinner';
import {AxiosContext} from '../components/context/AxiosContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { storage } from './StuLogin';
import { DrawerActions } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Profile = ({navigation}) => {
  const {authAxios} = useContext(AxiosContext);
  const [status, setStatus] = useState('loading');
  const [dp, setdp] = useState(null)
  const [name, setName] = useState('')
  const [department , setDepartment] = useState('')
  const [level , setLevel] = useState('')
  const [matricno , setMatricno] = useState('')
  const [email, setEmail] = useState('')

  const  profile  = useRef()
  
  useEffect( ()=>{
     
      setName(storage.getString('user.name'))
      setDepartment(storage.getString('user.department'))
      setEmail(storage.getString('user.email'))
      setMatricno(storage.getString('user.matricnumber'))
      setLevel(storage.getNumber('user.level'))
   
  }    

 ,[])

  
  return (
    <View className="w-screen h-screen bg-bgcolor">

      <View className='bg-main rounded-bl-[60px]  rounded-br-[60px] h-[40%]'>
      <View className='flex flex-row py-4'>
        <TouchableOpacity  onPress={()=>
          navigation.dispatch(DrawerActions.openDrawer())
          
          }>

          <Icon
          name="reorder-horizontal"
          size={35}
          color='#ee6c4d' 
          style={{
           paddingHorizontal: 6
          }}
          />

        </TouchableOpacity>
 
        {/* <Text  className='font-ageobold text-3xl text-white text-center mx-auto' >Profile</Text> */}
      </View>
      <View  className='h-[40%] mx-auto  '>
            {dp?  
              
            <Image source={require('../assets/reading.png')} style={{width: '100%', height:'100%', 
            }} resizeMode="contain"/>

            :
            <Icon 
            name="account" 
            color='#fff' 
            size={160} 
            style={{
              width: '100%',
              height: '100%'
            }}
            //  className='w-[100%] '
            />
              
            }

            </View>
            <View className='w-[60%] mx-auto items-center p-4'>
              <Text className='font-ageobold text-3xl text-white'>{name}</Text>
              <TouchableOpacity>
              <Text className='text-[12px] text-lightmain font-ageonormal'>Edit Profile Information
                <Icon
                 name="pencil" 
                 color='#e0fbfc' 
                 size={20} 
                />

              </Text>
              </TouchableOpacity>

            </View>

      </View>
        

     {/* profile information */}
  


      <ScrollView className='mt-8 w-[98%] mx-auto ' showsVerticalScrollIndicator={true}
      >
   
            <View className='border-t  border-lightmain p-5 '>
              <Text className='text-[18px] font-ageonormal text-black mb-3'>Department</Text>
              <Text className='text-[18px] font-ageomedium text-black'>{department}</Text>
            </View>
            <View className='border-t border-lightmain p-5 '>
              <Text className='text-[18px] font-ageonormal text-black mb-3'>Level</Text>
              <Text className='text-[18px] font-ageomedium text-black'>{level}</Text>
            </View>
            <View className='border-t border-lightmain p-5 '>
              <Text className='text-[18px] font-ageonormal text-black mb-3'>Matric Number</Text>
              <Text className='text-[18px] font-ageomedium text-black'>{matricno}</Text>
            </View>
            <View className='border-t border-b border-lightmain p-5 '>
              <Text className='text-[18px] font-ageonormal text-black mb-3'>Email</Text>
              <Text className='text-[18px] font-ageomedium text-black'>{email}</Text>
            </View>
            <View className='p-8'>

            </View>
      </ScrollView>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  imageContainer:{
    // height: windowHeight/5.5,
    width: windowWidth/2.2,
    alignContent: 'center',
    marginLeft:'auto',
    marginRight:'auto',
    // borderColor: 'grey', 
    borderRadius: 100,
    // borderWidth:1, 
    padding:4,
    marginTop: 5,

  },
})