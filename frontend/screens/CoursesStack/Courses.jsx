import { StyleSheet, Text, View } from 'react-native'
import React,{useContext} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AxiosContext} from '../../components/context/AxiosContext'

const Courses = ({navigation}) => {
  const {authAxios} = useContext(AxiosContext);

  const getResources = async(type)=>{
     console.log('pressed!')
     await authAxios.get(`/api/student-resources/?type=${type}`)
     .then((response)=>{
      console.log(response.data)
     navigation.navigate(`${type}`,{
      resources: response.data.resources
     })
     })
     .catch((e)=>console.log(e))

  }


  return (
    <View className='bg-white w-screen h-screen'>
     <View className='grid grid-rows-3 grid-flow-col gap-4'>

      <TouchableOpacity  onPress={()=>getResources('Lecture Notes')}>
        <View className='bg-lightgreen  p-2 justify-center  rounded-lg row-span-3'>
    
        <Text className='text-green font-ageomedium text-2xl text-center'>
            Lecture Notes
        </Text>


        </View>
      </TouchableOpacity>
  
      <TouchableOpacity  onPress={()=>getResources('Textbooks')}>
        <View className='bg-lightgreen  p-2 justify-center  rounded-lg row-span-3'>
    
        <Text className='text-green font-ageomedium text-2xl text-center'>
            Textbooks
        </Text>


        </View>
      </TouchableOpacity>
  
      <TouchableOpacity  onPress={()=>getResources('Past Questions')}>
        <View className='bg-lightgreen  p-2 justify-center  rounded-lg row-span-3'>
    
        <Text className='text-green font-ageomedium text-2xl text-center'>
            PastQuestions
        </Text>


        </View>
      </TouchableOpacity>
  
      <TouchableOpacity  onPress={()=>getResources('Lecture Notes')}>
        <View className='bg-lightgreen  p-2 justify-center  rounded-lg row-span-3'>
    
        <Text className='text-green font-ageomedium text-2xl text-center'>
            Lecture Slides
        </Text>


        </View>
      </TouchableOpacity>
  

      <TouchableOpacity  onPress={()=>getResources('Course Materials')}>
        <View className='bg-lightgreen  p-2 justify-center  rounded-lg row-span-3'>
    
        <Text className='text-green font-ageomedium text-2xl text-center'>
           Other Learning Materials
        </Text>


        </View>
      </TouchableOpacity>

      
    





      
     </View>
    </View>
  )
}

export default Courses

const styles = StyleSheet.create({})