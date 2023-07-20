import { StyleSheet, Text, View, TouchableOpacity , Dimensions} from 'react-native'
import React, { useEffect,useContext, useState } from 'react'
import { AxiosContext} from '../../components/context/AxiosContext'
import { storage } from '../StuLogin';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader2 from '../Loader2';
import NetInfo from "@react-native-community/netinfo";
import InternetCheck from '../../components/InternetCheck';
import messaging from '@react-native-firebase/messaging';
import { ScrollView } from 'react-native-gesture-handler';

import { showMessage, hideMessage } from "react-native-flash-message";
import Loader from '../Loader';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const LecturerView = ({navigation}) => {
   // internet connection check
    const [isOffline, setOfflineStatus] = useState(false) 
    const {authAxios} = useContext(AxiosContext);
   
    const [loading, setLoading] = useState(false)
  
    const [ searchterm , setSearchterm] = useState('')
   

        const getResources = async(type)=>{
            try{
              setLoading(true)
              
              await authAxios.get(`/api/lecturer-resources/?type=${type}`)
              .then((response)=>{
               
               setLoading(false)
               navigation.navigate('LecturerAR',{
               title: type ,
               resources: response.data.resources
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
                 showMessage({
                   message:  `${err.response.data}`,
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
             //  .finally(()=> setLaoding(false))
         
            }
            catch(e){
              
            }
          }
    
  return (
    <View>
             <View style={styles.header}>
        <View className='h-full  bg-gray rounded-b-full w-screen'>
        <TouchableOpacity onPress={()=>navigation.goBack()} className='pl-4'>
          <Icon name='arrow-left' size={40} color='#3d5a80' />
      </TouchableOpacity>
        <Text className="text-[27px] font-ageobold text-main text-center  ">Academic Resources</Text>
        </View>
          
        </View>
        {
          loading? 
          <Loader/>:
        
        <ScrollView 
          showsVerticalScrollIndicator= {false}
         
          automaticallyAdjustKeyboardInsets = {true}
          keyboardDismissMode= "on-drag"
          scrollToOverflowEnabled= {true}
        className='w-[80%] mx-auto pt-12 pb-60'>
          <View className='w-[100%] justify-between flex flex-row'>
          <TouchableOpacity  onPress={()=>getResources('Lecture Handout')} className='bg-blue  p-2 justify-center  rounded-lg h-40 w-[48%] my-2'>
                                        <View className='bg-grey p-2 justify-center  rounded-lg row-span-3'>
            
                                        <Text className='text-darkmain font-ageomedium text-[25px] text-center'>
                                         Lecture Handouts
                                        </Text>
            
            
                                        </View>
                            </TouchableOpacity>
                            <TouchableOpacity  onPress={()=>getResources('Textbook')} className='bg-blue  p-2 justify-center  rounded-lg h-40 w-[48%] my-2'>
                                        <View className='bg-grey p-2 justify-center  rounded-lg row-span-3'>
            
                                        <Text className='text-darkmain font-ageomedium text-[25px] text-center'>
                                          Textbooks
                                        </Text>
            
            
                                        </View>
                            </TouchableOpacity>
          </View>
     

                            <View className='w-[100%] flex justify-between flex-row'>
                            <TouchableOpacity   onPress={()=>getResources('Assignment')}className='bg-blue  p-2 justify-center  rounded-lg h-40 w-[48%] my-2'>
                                        <View className='bg-grey p-2 justify-center  rounded-lg row-span-3'>
            
                                        <Text className='text-darkmain font-ageomedium text-[25px] text-center'>
                                         Assignment
                                        </Text>
            
            
                                        </View>
                            </TouchableOpacity>

                            <TouchableOpacity  onPress={()=>getResources('Past Question')}
                            className='bg-blue  p-2 justify-center  rounded-lg h-40 w-[48%] my-2'>
                                        <View className='bg-grey p-2 justify-center  rounded-lg row-span-3'>
            
                                        <Text className='text-darkmain font-ageomedium text-[25px] text-center'>
                                          Past Examination Questions
                                        </Text>
            
            
                                        </View>
                            </TouchableOpacity>
          </View>
                         

                            <View className='w-[100%] flex flex-row'>
                            <TouchableOpacity   onPress={()=>getResources('Course Material')}
                            className='bg-blue  p-2 justify-center  rounded-lg h-40 w-[100%] my-2'>
                                        <View className='bg-grey p-2 justify-center  rounded-lg row-span-3'>
            
                                        <Text className='text-darkmain font-ageomedium text-[25px] text-center'>
                                         Other Course Materials
                                        </Text>
            
            
                                        </View>
                            </TouchableOpacity>
                </View>

                           <View className='p-4'>

                           </View>

                            </ScrollView>     
                            
        }
    </View>
  )
}

export default LecturerView

const styles = StyleSheet.create({
  header:{
    // backgroundColor: '#eaeaea',
    height: windowHeight/10,
    padding: 0,

},
})