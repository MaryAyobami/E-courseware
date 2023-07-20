import { StyleSheet, Text, View,ScrollView,FlatList, TouchableOpacity } from 'react-native'
import React,{useState,useRef,useEffect,useContext} from 'react'
import Resource from '../../components/Resource'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { storage } from '../StuLogin'
import { data } from '../../components/DepartmentData'
import { AxiosContext } from '../../components/context/AxiosContext'
import NetInfo from "@react-native-community/netinfo";
import InternetCheck from '../../components/InternetCheck';
import { showMessage, hideMessage } from "react-native-flash-message";


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


const LectureNotes = ({route,navigation}) => {
  const {resources,title} = route.params

  const [level , setLevel] = useState()
  const levelResources = useRef([])
 
  const levels = useRef()
  useEffect(()=>{
   
      const changeLevels = () => {
          
          department = storage.getString('user.department')
          
          let filterLevels = data.department.filter(item => item.name === department)
          
          levels.current = filterLevels[0].level;  
          setLevel(levels.current)
        }

      changeLevels()
      
  },[])

  const sortResources = (level)=>{
    const filterResources = resources.filter(item => item.level === level)
    levelResources.current = filterResources
    return(
        <DisplayResources resources={levelResources.current}/>
    )
} 


  
    if(title == 'GNS'){
      return(
        <View className='bg-bgcolor h-screen w-screen'>
          <View className='h-16  w-screen justify-center items-center flex flex-row'> 
          <Icon name="book-open-page-variant-outline" size={30} color='#ee6c4d'  style={{paddingVertical:4}} onPress={()=> navigation.goBack()} />
            <Text className='p-4 text-center text-main font-ageobold text-[27px]'>{title}s</Text>
          </View>
          {/* resources */}
          
          {
            resources.length? 
            <View className='w-[98%] mx-auto pt-8 ' >
               <ScrollView>
                {level.map((item)=>(
                    <Displaylevel item={item} pressed={sortResources(item)} />
                ))}

             </ScrollView>
 
              
          </View>
          :
          <View className='flex-1 justify-center pb-40 items-center'>
              <Icon name="book-open-page-variant-outline" size={200} color='#ee6c4d' />
              <Text className='font-ageobold text-grey-800 text-center text-3xl'> No available material for this option</Text>
              <Text  className='font-ageonormal text-grey-800 text-center text-[18px]'> You can try <Text className='font-ageonormal  underline text-center text-[18px]' onPress={()=> navigation.navigate('Search')}>searching</Text></Text>
            </View>
          }
          
          </View>
      )
    }
    else{

        return (
          <View className='bg-bgcolor h-screen w-screen'>
             <TouchableOpacity onPress={()=>navigation.goBack()} className='p-2'>
                <Icon name='arrow-left' size={40} color='#c9d1d3' />
            </TouchableOpacity>
          <View className='w-screen justify-center items-center flex flex-row'> 
          <Icon name="book-open-page-variant-outline" size={30} color='#c9d1d3' style={{paddingVertical:4}} onPress={()=> navigation.goBack()} />
            <Text className='p-4 text-center text-main font-ageobold text-[27px]'>{title}s</Text>
          </View>
          {/* resources */}
          
          {
            resources.length? 
            <View className='w-[98%] mx-auto pt-8 ' >
            <FlatList
                    data={resources}
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
          <View className='flex-1 justify-center pb-40 items-center'>
              <Icon name="book-open-page-variant-outline" size={120} color='#d3d3d3'/>
              <Text className='font-ageobold text-lightmain text-center text-[27px]'>No resource was found for this selection.</Text>
              <Text  className='font-ageonormal text-orange11 text-center text-[18px]'>Try <Text className='font-ageonormal text-orange11  underline text-center text-[18px]' onPress={()=> navigation.navigate('Search')}>searching</Text></Text>
            </View>
          }
          
          </View>
        )
}
}

export default LectureNotes

const styles = StyleSheet.create({})