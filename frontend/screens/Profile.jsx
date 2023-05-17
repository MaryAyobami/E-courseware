import { StyleSheet, Text, View ,Image, Dimensions} from 'react-native'
import React,{useCallback,useContext,useEffect,useState,useRef} from 'react'
import * as Keychain from 'react-native-keychain';
import { Spinner } from '../screens/Spinner';
import {AxiosContext} from '../components/context/AxiosContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { storage } from './StuLogin';


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
      setLevel(storage.getString('user.level'))
      console.log(storage.getString('user.level'))
  }    

 ,[])

 const editProfile = ()=>{

 }
  
  return (
    <View className="w-screen h-screen bg-white">

      <View className='bg-green rounded-bl-[60px]  rounded-br-[60px] h-[40%]'>
      <View className='flex flex-row py-4'>
        <TouchableOpacity   onPress={()=>navigation.openDrawer()}>
          <Icon
          name="reorder-horizontal"
          size={35}
          color='#fff' 
          style={{
           paddingHorizontal: 6
          }}//////////////////////////////////
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
              <Text className='text-[12px] text-lightgreen font-ageonormal'>Edit Profile Information
                <Icon
                 name="pencil" 
                 color='#DFF0EB' 
                 size={20} 
                />

              </Text>
              </TouchableOpacity>

            </View>

      </View>
        

     {/* profile information */}
  


      <ScrollView className='mt-8 w-[98%] mx-auto pb-40 flex-1' showsVerticalScrollIndicator={true}
      >
   
            <View className='border-t border-b border-gray p-5 '>
              <Text className='text-[16px] font-ageonormal text-black mb-3'>Department</Text>
              <Text className='text-xl font-ageomedium text-black'>{department}</Text>
            </View>
            <View className='border-t border-b border-gray p-5 '>
              <Text className='text-[16px] font-ageonormal text-black mb-3'>Level</Text>
              <Text className='text-xl font-ageomedium text-black'>{level}</Text>
            </View>
            <View className='border-t border-b border-gray p-5 '>
              <Text className='text-[16px] font-ageonormal text-black mb-3'>Matric Number</Text>
              <Text className='text-xl font-ageomedium text-black'>{matricno}</Text>
            </View>
            <View className='border-t border-b border-gray p-5 '>
              <Text className='text-[16px] font-ageonormal text-black mb-3'>Email</Text>
              <Text className='text-xl font-ageomedium text-black'>{email}</Text>
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