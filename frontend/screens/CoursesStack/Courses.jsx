import { ScrollView, StyleSheet, Text, TextInput, View, Dimensions , Keyboard} from 'react-native'
import React,{useContext, useEffect,useState} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AxiosContext} from '../../components/context/AxiosContext'
import { storage } from '../StuLogin';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader2 from '../Loader2';
import NetInfo from "@react-native-community/netinfo";
import InternetCheck from '../../components/InternetCheck';
import messaging from '@react-native-firebase/messaging';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Courses = ({navigation}) => {
  const {authAxios} = useContext(AxiosContext);
  const [name, setName] = useState('')
  const [loading, setLaoding] = useState(false)

  const [ searchterm , setSearchterm] = useState('')
  const [ clicked, setClicked] = useState()

  
// internet check
const [isOffline, setOfflineStatus] = useState(false); 

  const getResources = async(type)=>{
    try{
      setLaoding(true)
      console.log('pressed!')
      await authAxios.get(`/api/student-resources/?type=${type}`)
      .then((response)=>{
       console.log(response.data)
       setLaoding(false)
       navigation.navigate('AcademicResources',{
       title: type ,
       resources: response.data.resources
      })
      })
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
     //  .finally(()=> setLaoding(false))
 
    }
    catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    setName(storage.getString('user.name'))
  },[name])



  return (
    <View className='bg-bgcolor w-screen h-screen'>
        <InternetCheck isOffline={isOffline} onRetry={getResources}/>
      {
        loading? <Loader2/> :
      <React.Fragment>
          <View className="pb-4 text-center  flex flex-row justify-end items-end   px-2" style={{height: windowHeight/4.8}}>
            <View className='flex-1 px-1 justify-start text-start items-start '>
            <Text className='font-ageoheavy text-darkmain text-[55px]'>Welcome,</Text>
            <Text  className='font-ageonormal text-darkmain text-[18px] w-[100%]'>Access the learning materials for your courses below.</Text>
            </View>
            {/* <View className='bg-blue p-4 rounded-full h-[50%] mr-2'>
            <Icon name="account" color='#eaeaea' size={35} />
            </View> */}
          </View>
        
{/* search bar */}
<View className= 'w-[96%] flex flex-row  py-2 mx-auto'>
    {clicked && (
      <View className='p-2'>
        <TouchableOpacity
          onPress={() => {
            setSearchterm("")
            Keyboard.dismiss();
            setClicked(false);
          }}
        >
          <Text className="text-orange text-xl font-ageobold">Cancel</Text>
        </TouchableOpacity>
      </View>
    )}

    <View className={clicked? " border border-main rounded-full text-[20px] pl-4 pr-2  w-[80%] mx-auto text-black" : "border border-main rounded-full text-[20px] pl-4 pr-2  w-[100%] text-black" }>
      
    <View
      style={
        clicked
          ? styles.searchBar__clicked
          : styles.searchBar__unclicked
      }
    >
        
      {/* Input field */}
      <TextInput
        className="font-ageonormal text-black w-[90%] text-xl px-2"
        // placeholder="Search"
        value={searchterm}
        onChangeText={text=>setSearchterm(text)}
        onFocus={() => {
          setClicked(true);
        }}
      />

        {/* search Icon */}
        <TouchableOpacity>
        <Icon
          name="magnify"
          size={30}
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

        <ScrollView className=' flex-1 w-[98%] mx-auto  pt-4 pb-40'>
                  <TouchableOpacity  onPress={()=>getResources('Lecture Note')} className='bg-main  p-2 justify-center  rounded-lg h-40 w-[100%] my-2'>
                                        <View className='bg-grey p-2 justify-center  rounded-lg row-span-3'>
            
                                        <Text className='text-bgcolor font-ageomedium text-xl text-center'>
                                          Lecture Notes
                                        </Text>
            
            
                                        </View>
                            </TouchableOpacity>
             <View className='w-[100%]  flex flex-row'> 
    {/* view1 */}
     <View className='w-[50%] px-1'>
                  
                  <TouchableOpacity  onPress={()=>getResources('Textbook')} 
                  className=' h-60 bg-main 
                  p-2 justify-end  rounded-lg w-[100%] my-2'>
                    <View className='bg-grey p-2 justify-center  rounded-lg row-span-3'>
  
                    <Text className='text-bgcolor font-ageomedium text-xl text-center'>
                        Textbooks
                    </Text>
  
  
                    </View>
                  </TouchableOpacity>
  
                
  
                <TouchableOpacity  onPress={()=>getResources('GNS')} className='bg-icons  p-2 justify-center  rounded-lg h-44 w-[100%] my-2'>
                  <View className='bg-grey p-2 juandrpoistify-center  rounded-lg row-span-3'>
  
                <Text className='text-bgcolor font-ageomedium text-xl text-center'>
                    GNS
                </Text>
  
  
                </View>
              </TouchableOpacity>
  
              </View>
  
           {/* view 2 */}
            <View className='w-[50%] px-1'>
            <TouchableOpacity  onPress={()=>getResources('Past Question')} className='bg-orange p-2 justify-center  rounded-lg h-40 w-[100%] my-2'>
                          <View className='bg-grey p-2 justify-center  rounded-lg row-span-3'>
  
                          <Text className='text-bgcolor font-ageomedium text-xl text-center'>
                              Past Examination Questions
                          </Text>
  
  
                          </View>
                        </TouchableOpacity>
              
                    
                            <TouchableOpacity  onPress={()=>getResources('Course Material')} className='bg-blue  p-2 justify-end  rounded-lg h-60 w-[100%] my-2'>
                              <View className='bg-grey p-2 justify-end  rounded-lg row-span-3'>
  
                              <Text className='text-main font-ageomedium text-xl text-center'>
                                Other Course Materials
                              </Text>
  
  
                              </View>
                            </TouchableOpacity>
            </View>
             </View>
             
                    
             <TouchableOpacity  onPress={()=>navigation.navigate('Assignments')} className='bg-black  p-2 justify-center  rounded-lg h-40 w-[100%] my-2'>
                                        <View className='bg-grey p-2 justify-center  rounded-lg row-span-3'>
            
                                        <Text className='text-bgcolor font-ageomedium text-xl text-center'>
                                          Assignments
                                        </Text>
            
            
                                        </View>
                            </TouchableOpacity>

    </ScrollView>
    
  
    </React.Fragment>
      }
    </View>
  )
}

export default Courses

const styles = StyleSheet.create({

  searchBar__unclicked: {
    padding: 2,
    flexDirection: "row",
    width: "100%",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 2,
    flexDirection: "row",
    width: "100%",

    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },

})