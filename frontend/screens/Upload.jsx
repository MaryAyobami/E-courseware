import { StyleSheet, Text, View,TextInput,Pressable} from 'react-native'
import React,{useState,useRef,useCallback,useContext} from 'react'
import {data} from '../components/DepartmentData.js'
import { Spinner } from '../screens/Spinner';
import {AxiosContext} from '../components/context/AxiosContext';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import { showMessage, hideMessage } from "react-native-flash-message";
import DocumentPicker from 'react-native-document-picker';
import { AuthContext } from '../components/context/AuthContext.js';
import Header from './Header.jsx';


const Upload = ({navigation}) => {


  const {publicAxios} = useContext(AxiosContext);
  const {authAxios} = useContext(AxiosContext);

  // resou5rce details
  const name = useRef('')
  const type = useRef('')
  const department = useRef('')
  const level = useRef('')
  const [resource , setResource] = useState('')

  const [open, setOpen] = useState(false);
 // const [value, setValue] = useState(null);
  const validationerror = useRef('')

  const levels = useRef([])
  const [DepartmentLevels, setDepartmentLevels] = useState([])
  
  const changeLevels = (e) => {
    // console.log(e)
    let filterLevels = e.value.level
    // console.log(filterLevels)
    levels.current = filterLevels;  
    // console.log(levels.current)
    setDepartmentLevels(levels.current)
    department.current = e.value.name
 
    // console.log(DepartmentLevels)
  };
 
// handle file selection
const fileResponse = useRef()
const [filename , setFilename] = useState('');
 

const handleDocumentSelection = useCallback(async () => {
  try {
    const response = await DocumentPicker.pick({
      presentationStyle: 'fullScreen',
      
    });
    console.log(response)

    if (response != '')
      fileResponse.current = response[0]
      console.log(fileResponse.current)

      setFilename(response.name)//
      
  } catch (err) {
    console.warn(err);
  }
}, []);



//  handle upload
const handleUpload = async()=>{
   try{
      const fdata = new FormData()
      console.log(type.current, department.current, level.current)
      console.log(fileResponse.current)
      
      fdata.append("resource", fileResponse.current)
      fdata.append("type", type.current)
      fdata.append("department", department.current)
      fdata.append("level", level.current)
       


    // for (const pair of filedata.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);
    // }

    await authAxios.postForm(`/api/send-resource`, fdata
    // {
    //   resource: JSON.stringify(fileResponse.current[0]),
    //   type,
    //   level,
    //   department
    // }
    
    ).
    then((response) => {
      if(response.status == 201){
         navigation.navigate('RegistrationSuccess')
      }
      console.log(response.data);
    }).
    catch((err)=>{   
      if (axios.isAxiosError(err)) {
            validationerror.current = err.response.data
            console.error(validationerror.current)
            showMessage({
              message: `${validationerror.current}`,
                type: "danger",
            })
          
       console.error("Axios request failed", err.response?.data, err.toJSON());
      } 
      else{
        console.log(err);
      }
  
    })
   }
 catch(e){
  console.log(e)
 }
}


  return (
    <View className='w-screen h-screen bg-white'>
       <Header name="Share" open={()=>navigation.openDrawer()}/>
       <View className='w-[95%] mx-auto py-6'>
         
          <Text className='font-ageonormal text-xl text-grey-800'>The learning materials uploaded here will be saved to the central database.</Text>
       </View>

       <View className='w-[95%] mx-auto pt-10'>
                  {/* file */}
                  <Pressable className="items-center rounded-full border border-green mt-2 bg-" onPress={handleDocumentSelection}>
            <Text className="text-green  text-xl font-ageomedium py-4 px-12  " >Select File</Text>
          </Pressable>
            <Text className="text-green text-xl font-ageomedium text-center">{filename}</Text>

          {/* name */}
          {/* <View className='py-2'>
            <Text className='text-xl font-ageomedium text-grey-800'>Name</Text>
            <TextInput className="font-ageonormal border border-green rounded-full text-[20px] px-4 my-3 text-black" placeholder="e.g CSC 411 Lecture Note" onChangeText={(text)=>setName(text)}/>
          </View> */}
          {/* type */}
          <View className='py-2'>
            <Text className='text-xl font-ageomedium text-grey-800'>Type</Text>
            <Dropdown  
              data={data.resourceType.map((item) => ({ value: item, label: `${item.name}` }))}
              style={styles.dropdownContainer}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.placeholderStyle}
              inputSearchStyle={styles.placeholderStyle}
              value={type}
              onChange={(e)=> 
                {
                 type.current = e.value.name
               
              }}
              search
              maxHeight={300}
              labelField="label"
              valueField={type}
              placeholder=""
              searchPlaceholder="Search..."         
          />
          </View>
          {/* department */}
          
          <View className='py-2'>
             <Text className='text-xl font-ageomedium text-grey-800'>Department</Text>
             <Dropdown  
              data={data.department.map((item) => ({ value: item, label: `${item.name}` }))}
              style={styles.dropdownContainer}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.placeholderStyle}
              inputSearchStyle={styles.placeholderStyle}
              value={department}
              onChange={changeLevels}
              search
              maxHeight={300}
              labelField="label"
              valueField={department}
              placeholder=""
              searchPlaceholder="Search..."         
          />

          </View>

          {/* level */}
          <View className='py-2'>
            <Text className='text-xl font-ageomedium text-grey-800'>Level</Text>
            <Dropdown  
               data={levels.current.map((item)=>({ value: item , label: `${item}` }))}
               style={styles.dropdownContainer}
               placeholderStyle={styles.placeholderStyle}
               selectedTextStyle={styles.placeholderStyle}
               inputSearchStyle={styles.placeholderStyle}
               search
               maxHeight={300}
               value={level}
               onChange={item => {
                 level.current = item.value
            
               }}
               labelField="label"
               valueField={level}
               placeholder=""
               searchPlaceholder="Search..."     
          />

          </View>



        {/* upload button */}
        <Pressable className="items-center mt-4 rounded-full bg-green" onPress={handleUpload}>
            <Text className="text-gray text-xl font-ageomedium py-4 px-12  " >Upload</Text>
          </Pressable>
       </View>
    </View>
  )
}

export default Upload

const styles = StyleSheet.create({
  placeholderStyle: {
    color:'gray',
    fontFamily: 'AgeoPersonalUse',
    fontSize: 20
  },
  dropdownContainer: {
    borderRadius: 50,
    height: 50,
    borderWidth: 1,
    padding: 16,
    marginVertical: 4,
    borderColor: '#297373',
    marginBottom: 16,
    fontFamily: 'AgeoPersonalUse',
    fontSize: 20
  }
})