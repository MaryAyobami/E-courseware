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


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LecturersAR = ({navigation,route}) => {

    
    const {resources,title} = route.params

    const [level , setLevel] = useState()
    const levelResources = useRef([])
    const levels = useRef([])
   
    const [showResorces, setShow] = useState(false)
    
    useEffect(()=>{
     
        const changeLevels = () => {
            
            department = storage.getString('user.department')
            
            let filterLevels = data.department.filter(item => item.name === department)
            
            levels.current = filterLevels[0].level;  
            setLevel(levels.current)
          }

        changeLevels()
        
    },[])

    const DisplayResources = () =>{
      return(
          <View className='w-[98%] mx-auto pt-12' >
      
          <FlatList
                  data={levelResources.current}
                  renderItem = {({item})=>
                    <Resource res={item}/>    
                  }
                  keyExtractor={item => item._id}
                  />
            
         </View>
      )
    }
    
    const Displaylevel= (props)=>{
   
        
        return(
          <View className='bg-main rounded-lg shadow-sm px-4 py-8 my-2 w-[98%] mx-auto'>
          <TouchableOpacity onPress={props.pressed} className='flex flex-col'>
           <Icon name="chat" color= '#ee6c4d' size={30} />
             <Text className='text-[18px] pl-8 font-ageonormal text-gray'>{props.item} LEVEL</Text>
          </TouchableOpacity>
           
        </View>
        )
     }
    
    const sortResources = (level)=>{
        
        
        const filterResources = resources.filter(item => item.level == level)
        levelResources.current = filterResources

        console.log(levelResources)
      
        
      navigation.navigate('AR',
      {
        resources: levelResources,
        currentlevel: level,
        currentAR:title
      }
      )
        
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
            <Text className="text-[27px] font-ageobold text-main text-center  ">{title}</Text>
            </View>
              
            </View>

            <View className='pt-8'>
            <FlatList
                        data={level}
                        renderItem = {({item})=>
                        <>
                          <Displaylevel item={item} pressed={()=>sortResources(item)} />
       
                        </>
                           
                        }
                        keyExtractor={item => item}
                    
                        
                        />
       
            </View>
    
                
                                
                                
 
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