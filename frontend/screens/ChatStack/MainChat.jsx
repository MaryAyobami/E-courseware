import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useContext, useState } from 'react'
import { storage } from '../StuLogin'
import { data } from '../../components/DepartmentData'
import { AxiosContext } from '../../components/context/AxiosContext'
import NetInfo from "@react-native-community/netinfo";
import InternetCheck from '../../components/InternetCheck';
import { showMessage, hideMessage } from "react-native-flash-message";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader2 from '../Loader2'
import Loader from '../Loader'

const Displaylevel= (props)=>{
   return(
    <View className='bg-blue rounded-lg shadow-lg p-4 my-2 w-[98%] mx-auto'>
      <TouchableOpacity onPress={props.pressed}>
       <Icon name="chat" color= '#ee6c4d' size={30} />
         <Text className='text-xl font-ageonormal text-main'>{props.item} LEVEL</Text>
      </TouchableOpacity>
       
    </View>
   )
}

const MainChat = ({navigation}) => {
    
    const {authAxios} = useContext(AxiosContext);
    const [level , setLevel] = useState()
    const levels = useRef()
    const [loading, setLoading] = useState(false)
    
    // internet check
    const [isOffline, setOfflineStatus] = useState(false); 


    let department

    useEffect(()=>{
     
        const changeLevels = () => {
            
            department = storage.getString('user.department')
            console.log(department)
            let filterLevels = data.department.filter(item => item.name === department)
            console.log(filterLevels)
            levels.current = filterLevels[0].level;  
            setLevel(levels.current)
          }

        changeLevels()
        console.log(level)
    },[])

    const handleChat  = async(currentlevel) =>{
         setLoading(true)
         await authAxios.get(`/api/forum-members/?level=${currentlevel}`).then((response)=>{
        
        console.log(response.data.users)
 
        navigation.navigate('Chatroom',{
        
        members: response.data.users,
        currentuser: response.data.currentuser,
        currentlevel: currentlevel

       })})
       .catch((err)=>
       {
        setLoading(false)
        console.log(err)
        if(err.request) {
  
         const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
            const offline = !(state.isConnected && state.isInternetReachable);
            setOfflineStatus(offline);
          });
           
  
         //  removeNetInfoSubscription();
         setOfflineStatus(true)
          console.log(isOffline)
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

      // console.log(currentlevel)
    }

  return(
    <View>
      <View className='h-20 justify-center items-center mb-8'>
      <Text className="text-4xl font-ageobold text-main text-center flex-1 justify-center items-center pt-6 ">Discussion Forums</Text>
      </View>
    
   {loading? <Loader/>:
      <FlatList
              data={level}
              renderItem = {({item})=>
                <Displaylevel item={item} pressed={()=>handleChat(item)}  />
              }
              keyExtractor={item => item}
             
              />
      }
  
    </View>
  )
}

export default MainChat

const styles = StyleSheet.create({})