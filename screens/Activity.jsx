import { StyleSheet, Text, TouchableOpacity, View, FlatList , Alert, ActivityIndicator, Pressable} from 'react-native'
import React, { useState, useContext, useEffect, useRef } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { AxiosContext } from '../components/context/AuthContext';
import { AxiosContext } from '../components/context/AxiosContext';


const Activity = () => {
  const [upload, setupload] = useState(true)
  const [deleted, setdelete] = useState(false)
  const [loading,setLoading] = useState(false)
  const [clicked, setClicked] = useState(false)

  const [ allactivities, setActivities] =  useState(false)
  const {authAxios} = useContext(AxiosContext); 

  const activities = useRef([])

  const deleteResource = ()=>{
    return(
      Alert.alert('Resource has been deleted successfully')
    )
  }

  const getactivities = async(type)=>{
    try{
      setLoading(true)
      
      await authAxios.get(`/api/get-activities`)
      .then((response)=>{
       
       setLoading(false)

       activities.current = response.data.activities
       console.log(activities.current)

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

  useEffect(()=>{
    getactivities()
    setActivities(true)
  },[])

  return (
    <View className='bg-bgcolor w-screen h-screen'>
      {/* header */}
      <View className='h-24  w-screen justify-center items-center flex flex-row'> 
     {/* <Icon name="book-open-page-variant-outline" size={30} color='#ee6c4d'  style={{paddingVertical:4}} onPress={()=> navigation.goBack()} /> */}
       <Text className='p-4 text-center text-main font-ageobold text-[27px]'>Activities</Text>
     </View>
      {/* filter buttons */}
      {/* <View className='w-[60%] mx-auto  flex flex-row justify-between'>
         <TouchableOpacity onPress={()=> 
          {setupload(true)
           setdelete(false)
          }
          } className={upload? 'bg-darkmain p-4 w-[50%] border border-y-0 border-l-0 rounded-l-full' :'bg-blue rounded-l-full p-4 w-[50%] border border-y-0 border-l-0'}>
           <Text className= { upload? ' text-bgcolor font-ageonormal text-center text-[18px]' : 'font-ageonormal text-grey-800 text-center text-[18px]'}>UPLOADS</Text>
         </TouchableOpacity>

         <TouchableOpacity  onPress={()=> 
          {setdelete(true)
          setupload(false)
          }
          } className={deleted? 'bg-darkmain p-4 w-[50%] rounded-r-full ' :'bg-blue rounded-r-full p-4 w-[50%] '}>
           <Text className={ deleted? ' text-bgcolor font-ageonormal text-center text-[18px]' : 'font-ageonormal text-grey-800 text-center text-[18px]'}>DELETES</Text>
         </TouchableOpacity>
      </View> */}
      {/* activities*/}

      <View className='w-[98%] mx-auto pt-8'
        
        >
      {
        allactivities?
      
    
      <FlatList
              data={activities.current}
              renderItem = {({item})=>
              <View>
               
               <Pressable className='p-2 bg-gray my-2 flex flex-row ' 
          
               >
                <Text className='text-[16px] font-ageonormal flex-1 p-2'>You uploaded {item.resourceName} </Text>
                
                <TouchableOpacity onPress={()=> setClicked(true)}>
                  <Icon
                    name="dots-vertical"
                    size={30}
                    color='#ee6c4d'
                    style={{ marginLeft: 1 }}
                  />
                  </TouchableOpacity> 

               
                </Pressable> 
                <View  
          
                  className= {clicked ? "flex flex-row flex-end absolute  bg-main w-[35%] justify-end translate-x-64 translate-y-0 z-1" : "hidden"  }  
                  >
                <View className='pl-4 '>
                  <TouchableOpacity className="font-ageonormal text-[18px]  text-bgcolor px-2 pt-0"    onPress={ () => {
                      Alert.alert('Delete Resource', 'Are you sure you want to delete this resource?',[
                        {
                          text: 'Cancel',
                          // onPress: () => 
                        },
                        {
                          text: 'Yes',
                          onPress: deleteResource
                          
                        },
                      ])
                  
                    }} >
                  <Text className="font-ageonormal text-[16px] text-bgcolor p-2  " >Delete Resource</Text>
                  </TouchableOpacity>
               
                
                </View>
                <View>
                <TouchableOpacity onPress={()=>setClicked(false)} className='px-2'>
                  <Icon
                    name="close"
                    size={20}
                    color='#eaeaea'
                    style={{paddingRight: 4}}

                  />
                  </TouchableOpacity> 
                </View>
              </View>
              </View>
              }
              keyExtractor={item => item._id}
              />
        
     
      :
      <ActivityIndicator  size={'large'} color={'#ee6c4d'}/> 
            }
      </View>
    </View>
  )
}

export default Activity

const styles = StyleSheet.create({})