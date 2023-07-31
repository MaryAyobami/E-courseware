import { ScrollView, StyleSheet, Text, TextInput, View, Dimensions ,FlatList, TouchableOpacity,Keyboard, Image, ActivityIndicator} from 'react-native'
import React,{useContext, useEffect,useRef,useState} from 'react'

import { AxiosContext} from '../../components/context/AxiosContext'
import { storage } from '../StuLogin';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader2 from '../Loader2';
import NetInfo from "@react-native-community/netinfo";
import InternetCheck from '../../components/InternetCheck';
import messaging from '@react-native-firebase/messaging';

import { showMessage, hideMessage } from "react-native-flash-message";
import {useFloating, shift} from '@floating-ui/react-native';
import Resource from '../../components/Resource';
import { set } from 'react-native-reanimated';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Courses = ({navigation}) => {
  const {authAxios} = useContext(AxiosContext);
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const [ searchterm , setSearchterm] = useState('')
  const [ clicked, setClicked] = useState('')

  const [ userType, setUsertype] = useState()
 
  const resources = useRef()
  const [ result, setResult] = useState()

  const [ loadingR, setLoadingR] = useState(false)
  const [errorR , seterrorR] = useState(false)
  useEffect(()=>{

   if(storage.getString('user.userType')){
    setUsertype(JSON.parse(storage.getString('user.userType')))
   }
 
  })

// flaotingb
const {refs, floatingStyles} = useFloating({
  middleware: [shift()],
});
  
// internet check
const [isOffline, setOfflineStatus] = useState(false); 
const controller = new AbortController();

const pressed = () =>{
   controller.abort()
   setResult(null)
   setLoading(false)
   
}

const handleSearch = async(text) => {
      setLoadingR(true)
      setSearchterm(text)
      await authAxios.get(`/api/search-personal/?searchterm=${searchterm}`)
      .then((response)=>
      {
     
      
      resources.current = response.data
      setResult(resources.current)
     
      }

      )
      .catch(err=>{
        
          if (err.response) {
            // showMessage({
            //   message: `A server error has occured, please try again!`,
            //     type: "default",
            //     backgroundColor:  '#ee6c4d',
            //   titleStyle: {
            //     fontFamily:"tilda-sans_medium",
            //     color:'#f8f1e9',
            //     fontSize: 16,
            //     padding: 4
            //   }
            // })
            setLoadingR(false)
            seterrorR('A server error has occured, please try again!')
           
          }
          else if(err.request) {
            // showMessage({
            //   message: `No internet connection . Try Again!`,
            //     type: "default",
            //     backgroundColor:  '#ee6c4d',
            //   titleStyle: {
            //     fontFamily:"tilda-sans_medium",
            //     color:'#f8f1e9',
            //     fontSize: 16,
            //     padding: 4
            //   },
            // })
            setLoadingR(false)
            seterrorR('No internet connection . Try Again!')
        }})
     
    

  }
  const getResources = async(type)=>{
    try{
      setLoading(true)
      
      await authAxios.get(`/api/student-resources/?type=${type}`)
      .then((response)=>{
       
       setLoading(false)
       navigation.navigate('AcademicResources',{
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
       if (err.response.status === 400) {
        
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
    setName(storage.getString('user.name'))
  },[name])


  
if (userType == "Student"){

  return (
    <View className='bg-bgcolor w-screen flex-1'>
        <InternetCheck isOffline={isOffline} onRetry={getResources}/>
      {
        loading? <Loader2 press={pressed}/> :
      <React.Fragment>
          <View className="text-center justify-center  bg-main  px-4 py-8" style={{height: windowHeight/5}}>
            <View className=' pb-4 px-1 justify-start text-start items-start '>
            <Text className='font-ageoheavy text-bgcolor text-[26px]'>Welcome {name},</Text>
            <Text  className='font-ageonormal text-bgcolor text-[14px] w-[100%]'>Explore academic resources for your courses here.</Text>
            </View>
            {/* <View className='bg-blue p-4 rounded-full h-[50%] mr-2'>
            <Icon name="account" color='#eaeaea' size={35} />
            </View> */}
       
        
{/* search bar */}
<View className= 'w-[98%] flex flex-row pb-2 mx-auto' >
    {clicked && (
      <View className='p-0'>
        <TouchableOpacity
          onPress={() => {
            setSearchterm("")
            setResult('')
            Keyboard.dismiss();
            setClicked(false);
            setLoadingR(false)
          }}
        >
          <Text className="text-orange1 text-[18px] font-ageobold">Cancel</Text>
        </TouchableOpacity>
      </View>
    )}

    <View className={clicked? " border border-bgcolor bg-bgcolor rounded-lg text-[14px]  p-0  w-[80%] mx-auto text-black" : "border  border-bgcolor bg-bgcolor rounded-lg text-[14px] p-0 w-[100%] text-black" }>
      
    <View
      style={
        clicked
          ? styles.searchBar__clicked
          : styles.searchBar__unclicked
      }
    >
        
      {/* Input field */}
      <TextInput
        className="font-ageonormal text-black w-[90%] h-[36px] text-[18px] px-2"
        // placeholder="Search"
        value={searchterm}
        onChangeText={
          text=>handleSearch(text)}
        onFocus={() => {
          setClicked(true);
        }}
      />

        {/* search Icon */}
        <TouchableOpacity>
        <Icon
          name="magnify"
          size={25}
          color="#3d5a80"
          style={{ marginLeft: 1 }}
        />
      </TouchableOpacity>
    
      {/* cross Icon, depending on whether the search bar is clicked or not */}
      {/* {clicked && (
        <Icon name="close"   size={30}
        color='#E9D758' style={{ padding: 1 }} onPress={() => {
            setSearchterm("")
            Keyboard.dismiss();
            setClicked(false);
        }}/>
      )} */}

    </View>
    {/* cancel button, depending on whether the search bar is clicked or not */}
   
  </View>

  </View>


  </View>
  
  {
    result?
      <View className=' bg-grey-800 w-[80%] mx-auto shadow-lg rounded-b-lg  z-50 h-48'>
      <FlatList
                      data={result}
                      renderItem = {({item})=>
                        <Resource res={item} />    
                      }
                      keyExtractor={item => item._id}
                      // contentContainerStyle={{
                      //   flexGrow: 1,
                      //   }}
                    //////////////////
                      // refreshControl={
                      //   <RefreshControl refreshing={refreshing} onRefresh={getTasks} size={'large'} colors={['gray']} />
                      // }
                      />
      </View>
    :
    <View>
      {
        loadingR?
        <View>

        <ActivityIndicator color={'#ee6c4d'} style={{paddingTop:4}}/>
        <Text className='text-center pb-4 font-ageomedium'>loading....</Text>
        </View>
        :
        <View>
         
        </View>
      }
    </View>
  
 
  }

  
      <View className='h-48 p-4'>


            <Image source={require('../../assets/books.png')} style={{width: '100%', height:'100%'}} resizeMode="contain"/>
          </View>
          <View>
            <Text className='text-[25px] font-ageoheavy text-center text-main'>Available Resources</Text>
          </View>

        <ScrollView className=' flex-1 w-[98%] mx-auto  pt-4 pb-60'>
                  <TouchableOpacity  onPress={()=>getResources('Lecture Handout')} className='bg-main  p-2 justify-center  rounded-lg h-40 w-[100%] my-2'>
                                        <View className='bg-grey p-2 justify-center  rounded-lg row-span-3'>
            
                                        <Text className='text-bgcolor font-ageomedium text-[18px] text-center'>
                                          Lecture Handouts
                                        </Text>
            
            
                                        </View>
                            </TouchableOpacity>
             <View className='w-[100%]  flex flex-row'> 
    {/* view1 */}
     <View className='w-[50%] px-1'>
                  
                  <TouchableOpacity  onPress={()=>getResources('Textbook')} 
                  className=' h-48 bg-blue
                  p-2 justify-center  rounded-lg w-[100%] my-2'>
                    <View className='bg-grey p-2 justify-center  rounded-lg row-span-3'>
  
                    <Text className='text-main font-ageomedium text-[18px] text-center'>
                        Textbooks
                    </Text>
  
  
                    </View>
                  </TouchableOpacity>
  
                
  
                <TouchableOpacity  onPress={()=>getResources('GNS')} className='bg-lightgreen  p-2 justify-center  rounded-lg h-36 w-[100%] my-2'>
                  <View className='bg-grey p-2 juandrpoistify-center  rounded-lg row-span-3'>
  
                <Text className='text-bgcolor font-ageomedium text-[18px] text-center'>
                    GNS
                </Text>
  
  
                </View>
              </TouchableOpacity>
  
              </View>
  
           {/* view 2 */}
            <View className='w-[50%] px-1'>
            <TouchableOpacity  onPress={()=>getResources('Past Question')} className='bg-orange1 p-2 justify-center  rounded-lg h-36 w-[100%] my-2'>
                          <View className='bg-orange1 p-2 justify-center  rounded-lg row-span-3'>
  
                          <Text className='text-bgcolor font-ageomedium text-[18px] text-center'>
                              Past Examination Questions
                          </Text>
  
  
                          </View>
                        </TouchableOpacity>
              
                    
                            <TouchableOpacity  onPress={()=>getResources('Course Material')} className='bg-bg  p-2 justify-end  rounded-lg h-48 w-[100%] my-2'>
                              <View className='bg-grey p-2 justify-end  rounded-lg row-span-3'>
  
                              <Text className='text-main font-ageomedium text-[18px] text-center'>
                                Other Course Materials
                              </Text>
  
  
                              </View>
                            </TouchableOpacity>
            </View>
             </View>
             
                    
             <TouchableOpacity  onPress={()=>navigation.navigate('Assignments')} className='bg-darkmain  p-2 justify-center  rounded-lg h-40  w-[100%] my-2'>
                                        <View className='bg-grey p-2 justify-center  rounded-lg row-span-3'>
            
                                        <Text className='text-bgcolor font-ageomedium text-[18px] text-center'>
                                          Assignments
                                        </Text>
            
            
                                        </View>
                            </TouchableOpacity>
                            <View className='p-4'>

                            </View>

    </ScrollView>
    
  
    </React.Fragment>
      }
    </View>
  )
    }

  else if (userType == 'Lecturer'){
    return(
      <View className='bg-bgcolor w-screen h-screen'>
           <InternetCheck isOffline={isOffline} onRetry={getResources}/>
           <View className="pb-4 text-center justify-end items-end  " >
            <View className='justify-center text-start w-[100%] bg-main items-start p-2 rounded-br-full ' style={{height: windowHeight/6}}>
            <Text className='font-ageoheavy  text-bgcolor text-[25px]'>Welcome {name},</Text>
            <Text  className='font-ageonormal text-bgcolor text-[14px] '>Easily share academic resources with your students in one place.</Text>

            </View>
            {/* <View>
              <Text className='text-orange1  text-[18px] p-2  font-ageomedium text-right'>Activities</Text>
            </View> */}
            <View className='w-[70%] mx-auto '  style={{height: windowHeight - windowHeight/5}}> 

            <TouchableOpacity  onPress={()=>navigation.navigate('LecturerUpload')} className='bg-icon  p-2 justify-center  rounded-lg  w-[100%] my-2 flex flex-row'>

            <View className=' h-60 w-[60%]
            '>
            <Image source={require('../../assets/uploading.png')} style={{width: '110%', height:'100%'}} resizeMode="cover"/>
           </View>

                                        <View className='bg-grey p-2 justify-end w-[60%] rounded-lg row-span-3'>
            
                                        <Text className='text-darkmain font-ageo p-4 rounded-full text-[18px] text-center'>
                                          Upload academic resources.
                                        </Text>
            
            
                                        </View>
                            </TouchableOpacity>
        

                            <TouchableOpacity  onPress={()=>navigation.navigate('LecturerView')} className='bg-bgcolor  p-2 flex flex-row justify-center rounded-lg w-[100%] my-2'>
                            <View className='p-2 justify-start w-[50%] row-span-3'>
            
                                      <Text className='text-darkmain p-2 rounded-full font-ageo text-[18px] text-center'>
                                        View available academic resources .
                                      </Text>


                                      </View>
                              <View className='h-60  w-[60%] '>
                                <Image source={require('../../assets/orangebook.png')} style={{width: '120%', height:'120%'}} resizeMode="cover"/>
                              </View>
                                       
                                          
                         
                            </TouchableOpacity>
                            </View>
          </View>
        
      </View>
    )
  }
}

export default Courses

const styles = StyleSheet.create({

  searchBar__unclicked: {
    padding: 0,
    flexDirection: "row",
    width: "100%",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 0,
    flexDirection: "row",
    width: "100%",

    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    width: "90%",
  },

})