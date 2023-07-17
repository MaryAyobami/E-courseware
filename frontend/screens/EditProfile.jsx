// import { StyleSheet, Text, View, ScrollView } from 'react-native'
// import React, { useState } from 'react'
// import { TextInput } from 'react-native-gesture-handler'
// import { storage} from './StuLogin'
// import { AuthContext } from '../components/context/AuthContext'


// const EditProfile = () => {  

//         const {authAxios} = useContext(AxiosContext);

//         const [name, setName] = useState(storage.getString('user.name'))
//         const [department , setDepartment] = useState(storage.getString('user.department'))
//         const [level , setLevel] = useState(storage.getString('user.level'))
//         const [matricno , setMatricno] = useState(storage.getString('user.matricnumber'))
//         const [email, setEmail] = useState(storage.getString('user.email'))

//         const  profile  = useRef()

//         const handleEdit = async() =>{
//             await authAxios.put(`/api/editprofile-student`,{
//                 name,
//                 matricnumber:matricno,
//                 level,
//                 department,
//                 email
//             })
//             .then((response)=>{
//              console.log(response.data)
//             })
//             .catch((e)=>console.log(e))
//         }

//   return (
//     <View>
//       <View>
//         <Text className="font-ageoheavy text-3xl text-black"> Edit Profile</Text>
//         <Text  className="font-ageoheavy text-3xl text-black">Edit your profile information, for the changes to reflect, you need to logout and login again.</Text>
//       </View>

//       <ScrollView>
//             <View className='my-4 '>
//                 <Text className='font-ageonormal text-[16px] text-pink'>Name</Text>
//                 <TextInput className="font-ageonormal border border-main rounded-lg px-4 my-2 text-[20px]  text-black" value={name} onChange={e => setName(e)}/>
//             </View>
//             <View className='my-4 '>
//                 <Text className='font-ageonormal text-[16px] text-pink'>Matric Number</Text>
//                 <TextInput className="font-ageonormal border border-main rounded-lg px-4 my-2 text-[20px]  text-black" value={matricno} onChange={e => setMatricno(e)}/>
//             </View>
//             <View className='my-4 '>
//                 <Text className='font-ageonormal text-[16px] text-pink'>Level</Text>
//                 <TextInput className="font-ageonormal border border-main rounded-lg px-4 my-2 text-[20px]  text-black" value={level} onChange={e => setLevel(e)} />
//             </View>

//             <View className='my-4 '>
//                 <Text className='font-ageonormal text-[16px] text-pink'>Department</Text>
//                 <TextInput className="font-ageonormal border border-main rounded-lg px-4 my-2 text-[20px]  text-black" value={department} onChange={e => setDepartment(e)}/>
//             </View>

//             <View className='my-4 '>
//                 <Text className='font-ageonormal text-[16px] text-pink'>Email</Text>
//                 <TextInput className="font-ageonormal border border-main rounded-lg px-4 my-2 text-[20px]  text-black" value={email} onChange={e => setEmail(e)} />
//             </View>

//       </ScrollView>
//     </View>
//   )
// }

// export default EditProfile

// const styles = StyleSheet.create({})