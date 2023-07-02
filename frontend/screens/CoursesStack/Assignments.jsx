import { StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Assignments = () => {
  const [all, setAll] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  return (
    <View className='bg-bgcolor w-screen h-screen'>
      {/* header */}
      <View className='h-24  w-screen justify-center items-center flex flex-row'> 
     <Icon name="book-open-page-variant-outline" size={30} color='#ee6c4d'  style={{paddingVertical:4}} onPress={()=> navigation.goBack()} />
       <Text className='p-4 text-center text-main font-ageobold text-4xl'>Assignment</Text>
     </View>
      {/* filter buttons */}
      <View className='w-[60%] mx-auto  flex flex-row justify-between'>
         <TouchableOpacity onPress={()=> 
          {setAll(true)
           setSubmitted(false)
          }
          } className={all? 'bg-darkmain p-4 w-[50%] border border-y-0 border-l-0 rounded-l-full' :'bg-blue rounded-l-full p-4 w-[50%] border border-y-0 border-l-0'}>
           <Text className= { all? ' text-bgcolor font-ageonormal text-center text-xl' : 'font-ageonormal text-grey-800 text-center text-xl'}>All</Text>
         </TouchableOpacity>

         <TouchableOpacity  onPress={()=> 
          {setSubmitted(true)
          setAll(false)
          }
          } className={submitted? 'bg-darkmain p-4 w-[50%] rounded-r-full ' :'bg-blue rounded-r-full p-4 w-[50%] '}>
           <Text className={ submitted? ' text-bgcolor font-ageonormal text-center text-xl' : 'font-ageonormal text-grey-800 text-center text-xl'}>Submitted</Text>
         </TouchableOpacity>
      </View>

      {/* assignments */}

    </View>
  )
}

export default Assignments

const styles = StyleSheet.create({})