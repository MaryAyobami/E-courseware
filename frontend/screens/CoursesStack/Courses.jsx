import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React,{useContext, useEffect,useState} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AxiosContext} from '../../components/context/AxiosContext'
import { storage } from '../StuLogin';

const Courses = ({navigation}) => {
  const {authAxios} = useContext(AxiosContext);
  const [name, setName] = useState('')

  const getResources = async(type)=>{

     console.log('pressed!')
     await authAxios.get(`/api/student-resources/?type=${type}`)
     .then((response)=>{
      console.log(response.data)
     navigation.navigate('AcademicResources',{
      title: type ,
      resources: response.data.resources
     })
     })
     .catch((e)=>console.log(e))

  }

  useEffect(()=>{
    setName(storage.getString('user.name'))
  },[name])


  return (
    <View className='bg-bgcolor w-screen h-screen'>
          <View className="pt-12 pb-2 px-2 ">
            <Text className='font-ageoheavy text-blackk text-4xl'>Welcome {name} </Text>
            <Text  className='font-ageonormal text-blackk text-xl'>Access the learning materials for your courses below.</Text>
          </View>
        
        <ScrollView className='flex-1 pb-20'>
            {/* view1 */}
            <View className=' border border-yellow  border-t-0 border-r-0 border-l-0 my-4 mx-auto w-[98%] '>

            <TouchableOpacity  onPress={()=>getResources('Lecture Note')} 
            className=' h-28 bg-main 
            bg-gradient-to-r from-lightmain via-orange to-pink
            p-2 justify-center  rounded-lg w-[100%] my-2'>
              <View className='bg-grey p-2 justify-center  rounded-lg row-span-3'>

              <Text className='text-lightmain font-ageomedium text-xl text-center'>
                  Lecture Notes
              </Text>


              </View>
            </TouchableOpacity>

            </View>

                    {/* view1 */}
                    <View className=' border border-yellow  border-t-0 border-r-0 border-l-0 my-4 mx-auto w-[98%] '>

      <TouchableOpacity  onPress={()=>getResources('Textbook')} className='bg-pink  p-2 justify-center  rounded-lg h-28 w-[100%] my-2'>
        <View className='bg-grey p-2 justify-center  rounded-lg row-span-3'>

      <Text className='text-main font-ageomedium text-xl text-center'>
         Textbooks
      </Text>


      </View>
    </TouchableOpacity>
    <Text className='text-blackk font-ageonormal text-xl text-start'>
          Textbooks
      </Text>

    </View>
            {/* view1 */}
            <View className=' border border-yellow  border-t-0 border-r-0 border-l-0 my-4 mx-auto w-[98%] '>

            <TouchableOpacity  onPress={()=>getResources('Lecture Notes')} className='bg-orange p-2 justify-center  rounded-lg h-28 w-[100%] my-2'>
              <View className='bg-grey p-2 justify-center  rounded-lg row-span-3'>

              <Text className='text-main font-ageomedium text-xl text-center'>
                  Past Examination Questions
              </Text>


              </View>
            </TouchableOpacity>
            </View>

                {/* view1 */}
                <View className=' border border-yellow  border-t-0 border-r-0 border-l-0 my-4 mx-auto w-[98%] '>

                <TouchableOpacity  onPress={()=>getResources('Course Material')} className='bg-yellow  p-2 justify-center  rounded-lg h-28 w-[100%] my-2'>
                  <View className='bg-grey p-2 justify-center  rounded-lg row-span-3'>

                  <Text className='text-main font-ageomedium text-xl text-center'>
                     Other Course Materials
                  </Text>


                  </View>
                </TouchableOpacity>
      
                </View>

    </ScrollView>
    
  


    </View>
  )
}

export default Courses

const styles = StyleSheet.create({})