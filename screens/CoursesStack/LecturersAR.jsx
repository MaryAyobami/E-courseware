import { ScrollView, StyleSheet, Text, View ,TouchableOpacity,Modal, Dimensions} from 'react-native'
import React , {useRef, useState, useEffect} from 'react'
import Resource from '../../components/Resource'
import { storage } from '../StuLogin'
import { data } from '../../components/DepartmentData'
import { AxiosContext } from '../../components/context/AxiosContext'
import NetInfo from "@react-native-community/netinfo";
import InternetCheck from '../../components/InternetCheck';
import { showMessage, hideMessage } from "react-native-flash-message";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList } from 'react-native-gesture-handler'

const DisplayResources = (props) =>{
  return(
      <View className='w-[98%] mx-auto pt-8 ' >
  
      <FlatList
              data={props.resources}
              renderItem = {({item})=>
                <Resource res={item}/>    
              }
              keyExtractor={item => item._id}
              />
        
     </View>
  )
}

const Displaylevel= (props)=>{
    const [showResorces, setShow] = useState(props.show)
    return(
     <View className='bg-bgcolor rounded-lg shadow-lg p-4 my-2 w-[98%] mx-auto'>
           <Text className='text-[18px] font-ageonormal text-main'>{props.item} LEVEL</Text>
                <TouchableOpacity onPress={props.pressed}>
                    <Icon name="chat" color= '#ee6c4d' size={30} />
                </TouchableOpacity>
     
            <View>
        {
                              showResorces ?
                              <DisplayResources resources={props.resources}/>
                              :
                              <>
                              </>
                              }
        </View>
     </View>
    )
 }


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LecturersAR = ({navigation,route}) => {

    
    const {resources,title} = route.params

    const [level , setLevel] = useState()
    const levelResources = useRef([])
    const levels = useRef([])
   
    // const [showResorces, setShow] = useState(false)
    
    useEffect(()=>{
     
        const changeLevels = () => {
            
            department = storage.getString('user.department')
            
            let filterLevels = data.department.filter(item => item.name === department)
            
            levels.current = filterLevels[0].level;  
            setLevel(levels.current)
          }

        changeLevels()
        
    },[])

    // const DisplayResources = (props) =>{
    //   return(
    //       <View className='w-[98%] mx-auto pt-8 ' >
      
    //       <FlatList
    //               data={props.resources}
    //               renderItem = {({item})=>
    //                 <Resource res={item}/>    
    //               }
    //               keyExtractor={item => item._id}
    //               />
            
    //      </View>
    //   )
    // }
    
    // const Displaylevel= (props)=>{
    //     const [showResorces, setShow] = useState(false)
    //     

        
    //     return(
    //      <View className=' shadow-lg px-4 pt-8 mt-2 mx-12  '>
    //            <Text className='text-[18px]  font-ageonormal text-main'>{props.item} LEVEL</Text>
    //                 <TouchableOpacity onPress={props.pressed} className='text-center'>
    //                     <Icon name="chevron-down" color= '#ee6c4d' size={30} />
    //                 </TouchableOpacity>
         
    //             <View>
    //         {
    //                               showResorces ?
    //                               <DisplayResources resources={levelResources.current}/>
    //                               :
    //                               <>
    //                               </>
    //                               }
    //         </View>
    //      </View>
    //     )
    //  }
    
    const sortResources = (level)=>{
        
        
        const filterResources = resources.filter(item => item.level == level)
        levelResources.current = filterResources
      
        
        // setShow(true)
        
        // return(
        //     <DisplayResources resources={levelResources.current}/>
        // ) 
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

            <FlatList
                        data={level}
                        renderItem = {({item})=>
                        <>
                          <Displaylevel item={item} pressed={()=>sortResources(item)} show={true} resources={levelResources.current}/>
                              {/* {
                              showResorces && item ?
                              <DisplayResources resources={levelResources.current}/>
                              :
                              <>
                              </>
                              } */}
                        </>
                           
                        }
                        keyExtractor={item => item}
                        horizontal={true}
                        
                        />
                <View className='p-4'>

                </View>
                    {/* {
                                  showResorces ?
                                  <DisplayResources resources={levelResources.current}/>
                                  :
                                  <>
                                  </>
                                  }  */}

 
    </View>
  )
}

export default LecturersAR

const styles = StyleSheet.create({

  header:{
    // backgroundColor: '#eaeaea',
    height: windowHeight/10,
    padding: 0,

},
})