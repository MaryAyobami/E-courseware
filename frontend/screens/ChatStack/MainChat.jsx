import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native'
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Displaylevel= (props)=>{
   return(
    <View className='bg-main rounded-lg shadow-sm p-4 my-2 w-[98%] mx-auto'>
      <TouchableOpacity onPress={props.pressed} className='flex flex-col'>
       <Icon name="forum" color= '#ee6c4d' size={30} />
         <Text className='text-[16px] pl-8 font-ageonormal text-gray'>{props.item} LEVEL</Text>
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


    // let department;

    useEffect(()=>{
     
        const changeLevels = () => {
         
            setLoading(false)
            const  department = storage.getString('user.department')
            console.log(department)
            let filterLevels = data.department.filter(item => item.name === department)
            console.log(filterLevels)
            levels.current = filterLevels[0].level;  
            setLevel(levels.current)
          }
            setLoading(false)
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
       ).finally(() => {
        setLoading(false);
      });
      // console.log(currentlevel)
    }

  return(
    <View className='h-screen'>
   <View style={styles.header} className='rounded-b-full '>
        <View className=' bg-gray rounded-b-full w-screen'>
        <TouchableOpacity onPress={()=>navigation.goBack()} className='pl-4 mt-2'>
          <Icon name='arrow-left' size={30} color= '#3d5a80' />
      </TouchableOpacity>
        <Text className="text-[27px] font-ageobold text-main text-center  ">Discussion Forum</Text>
        </View>
          
        </View>
    
    
   {loading? <Loader/>:
   <View className='flex-1 pt-12'>
      <FlatList
              data={level}
              renderItem = {({item})=>
                <Displaylevel item={item} pressed={()=>handleChat(item)}  />
              }
              keyExtractor={item => item}
             
              />
          </View>
      }
  
    </View>
  )
}

export default MainChat

const styles = StyleSheet.create({
  header:{
    backgroundColor: '#eaeaea',
    height: windowHeight/9,
    padding: 0,

},
})