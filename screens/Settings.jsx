import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState , useContext} from 'react'
import Header from './Header'
import { DrawerActions } from '@react-navigation/native';
import { AxiosContext } from '../components/context/AxiosContext';
import NetInfo from "@react-native-community/netinfo";
import InternetCheck from '../components/InternetCheck';
import { showMessage, hideMessage } from "react-native-flash-message";


const Settings = ({navigation}) => {
  const [on,setOn] = useState(true)
  const [off, setOff] = useState(false)
  const [pushnotification, setPushnotification] = useState(true)
      
  const {authAxios} = useContext(AxiosContext);

  const handlePush = async(value)=>{

    setLoading(true)
    setPushnotification(value)
    await authAxios.post(`/api/push-notification`,{pushnotification}).then((response)=>{  
      
      showMessage({
        message: `Notification settings has been updated!`,
          type: "default",
          backgroundColor:  '#ee6c4d',
        titleStyle: {
          fontFamily:"tilda-sans_medium",
          color:'#f8f1e9',
          fontSize: 16,
          padding: 4
        },
      })

      })
     .catch((err)=>
     {
      setLoading(false)
      
      if(err.request) {

       const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
          const offline = !(state.isConnected && state.isInternetReachable);
          setOfflineStatus(offline);
        });
         

       //  removeNetInfoSubscription();
       setOfflineStatus(true)
        
      }
      if (err.response.status == 400) {
        const  validationerror = err.response.data
        console.error(validationerror)
        showMessage({
          message:  `${validationerror}`,
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
     }
     )
  }

  return (
    <View className='bg-bgcolor h-screen '>
      <Header name="Notification" open={()=>  navigation.dispatch(DrawerActions.openDrawer())}/>

      <View className='pt-12 w-[96%] mx-auto'>
        <View className='flex flex-row justify-between'> 

      {
        on?
        <Text className='font-ageoheavy text-main text-[18px]'> ON</Text>
        :
        <Text className='font-ageoheavy text-main text-[18px]'> OFF</Text>
      }
       
        <View className='w-[20%] px-2 mr-4 flex flex-row justify-between'>
         <TouchableOpacity onPress={()=> 
          {setOn(true)
           setOff(false)
           handlePush(true)
          }
          } className={on? 'bg-lightmain p-4 w-[50%] border border-y-0 border-l-0 rounded-l-full' :'bg-darkmain rounded-l-full p-4 w-[50%] border border-y-0 border-l-0'}>

         </TouchableOpacity>

         <TouchableOpacity  onPress={()=> 
          {setOff(true)
          setOn(false)
          handlePush(false)
          }
          } className={off? 'bg-lightmain p-4 w-[50%] rounded-r-full ' :'bg-darkmain rounded-r-full p-4 w-[50%] '}>
      
         </TouchableOpacity>
      </View>
        </View>
        <Text className='font-ageonormal text-[18px] text-black  w-[98%] mx-auto pt-6'>If turned on , notifications will be sent to you when new resources related to your level are uploaded.</Text>     

      </View>

    </View>
  )
}

export default Settings

const styles = StyleSheet.create({})