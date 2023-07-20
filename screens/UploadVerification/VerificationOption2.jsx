import { StyleSheet, Text, TouchableOpacity, View ,TextInput, ActivityIndicator} from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../components/context/AuthContext'
import NetInfo from "@react-native-community/netinfo";
import InternetCheck from '../../components/InternetCheck';
import messaging from '@react-native-firebase/messaging';
import Loader from '../Loader';
import { showMessage, hideMessage } from "react-native-flash-message";

const VerificationOption2 = () => {
  const { authAxios } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
// internet check
const [isOffline, setOfflineStatus] = useState(false); 


  const handleAprrovalRequest = async() =>{
    try{
      if(email == ''){
        showMessage({
          message: `Input field cannot be empty`,
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
        setLoading(true)
        
        await authAxios.post(`/api/request-approval`, {email})
        .then((response)=>{
         
         setLoading(false)
         navigation.navigate('ApprovalRequestSuccessful')
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
           validationerror.current = err.response.data
           console.error(validationerror.current)
           showMessage({
             message:  `${validationerror.current}`,
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

     //  .finally(()=> setLaoding(false))
 
    }
    catch(e){
      
    }

  }
  return (
    <View className='flex-1 w-screen bg-bgcolor'>



      <View className='w-[96%] mx-auto'>
          <Text className='font-ageonormal text-[16px] text-black py-2 text-justify'>Enter the email address of a lecturer. An email will sent to them for approval. Once approved, you will be notified of your verification status via email.</Text>
          <TextInput placeholder='E-mail' className="font-ageonormal border mt-6 border-main  rounded-lg text-[20px] px-4 my-3 text-black  focus:border-orange"  onChangeText={(text)=>setEmail(text)}/>
      </View>

        <TouchableOpacity className='absolute bottom-0 w-[98%] left-1 mb-6 bg-main p-4 rounded-lg' onPress={handleAprrovalRequest}>
          {
            loading? 
            <ActivityIndicator color={'#eaeaea'} />
            :
            <Text className='text-[18px] text-bgcolor font-heavy text-center'>REQUEST APPROVAL</Text>
          }

        </TouchableOpacity>
    </View>
  )
}

export default VerificationOption2

const styles = StyleSheet.create({})