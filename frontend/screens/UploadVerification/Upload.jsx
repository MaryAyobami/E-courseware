import { StyleSheet, Text, View,TextInput,Pressable, TouchableOpacity, Dimensions} from 'react-native'
import React,{useState,useRef,useCallback,useContext} from 'react'
import {data} from '../../components/DepartmentData.js'
import { Spinner } from '../Spinner.jsx';
import {AxiosContext} from '../../components/context/AxiosContext.js';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import { showMessage, hideMessage } from "react-native-flash-message";
import DocumentPicker from 'react-native-document-picker';
import { AuthContext } from '../../components/context/AuthContext.js';
import Header from '../Header.jsx';
import { DrawerActions } from '@react-navigation/native';

import Pdf from 'react-native-pdf';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

      setFilename(fileResponse.current.name)//
      
  } catch (err) {
    console.warn(err);
  }
}, []);



//  handle upload
const handleUpload = async()=>{
   try{

    if(type.current == '' || level.current == ''){
      showMessage({
        message: `The input fields cannot be empty!`,
          type: "default",
          backgroundColor: '#3b2e2a',
        titleStyle: {
          fontFamily:"tilda-sans_medium",
          color:'#f8f1e9',
          fontSize: 16,
          padding: 4
        },
      })
    }
 else{
  const fdata = new FormData()
      console.log(type.current, department.current, level.current)
      console.log(fileResponse.current)
      
      fdata.append("resource", fileResponse.current)
      fdata.append("type", type.current)
      fdata.append("department", department.current)
      fdata.append("level", level.current)
       
    await authAxios.postForm(`/api/send-resource`, fdata
    
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
    
   }
 catch(e){
  console.log(e)
 }
}

const handlePreview = ()=>{
  const source = {uri: fileResponse.current}
           return(
              <View style={styles.container}>
                  <Pdf
                      source={source}
                      onLoadComplete={(numberOfPages,filePath) => {
                          console.log(`Number of pages: ${numberOfPages}`);
                      }}
                      onPageChanged={(page,numberOfPages) => {
                          console.log(`Current page: ${page}`);
                      }}
                      onError={(error) => {
                          console.log(error);
                      }}
                      onPressLink={(uri) => {
                          console.log(`Link pressed: ${uri}`);
                      }}
                      style={styles.pdf}/>
              </View>
           )
}


  return (
    <View className='w-screen h-screen bg-bgcolor '>
        <View style={styles.header}>
        <View className='h-full flex flex-row  items-end pt-2'>
            <TouchableOpacity onPress={()=> navigation.openDrawer()}>
               <Icon name="reorder-horizontal" size={35} color='#ee6c4d' />
            </TouchableOpacity> 
        <Text className="text-4xl font-ageobold text-main text-center flex-1 -ml-12">Share</Text>
        </View>
          
        </View>

       <View className='w-[95%] mx-auto pt-6'>
         
          <Text className='font-ageonormal text-[12px] text-center text-grey-800'>The learning materials uploaded here will be saved to the central database.</Text>
       </View>

       <View className='w-[95%] mx-auto pt-10'>
                {/* file */}   
          
         
          <TouchableOpacity className="items-center rounded-full border border-main mt-2 bg-" onPress={handleDocumentSelection}>
           <Text className="text-main  text-xl font-ageomedium py-4 px-12  ">Select File</Text>
          </TouchableOpacity>
            
          <Text className="text-main  text-xl font-ageomedium py-4 px-12  ">{filename} </Text>
          {
            filename && <Text className="text-orange  text-xl font-ageoheavy py-1 px-12  ">PREVIEW FILE</Text>
          }
        

          {/* name */}
          {/* <View className='py-2'>
            <Text className='text-xl font-ageomedium text-grey-800'>Name</Text>
            <TextInput className="font-ageonormal border border-main rounded-full text-[20px] px-4 my-3 text-black" placeholder="e.g CSC 411 Lecture Note" onChangeText={(text)=>setName(text)}/>
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
              value={type.current}
              onChange={(e)=> 
                {
                 type.current = e.value.name
               
              }}
              search
              maxHeight={300}
              labelField="label"
              valueField={type.current}
              placeholder="Resource Type"
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
              value={department.current}
              onChange={changeLevels}
              search
              maxHeight={300}
              labelField="label"
              valueField={department.current}
              placeholder="Department"
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
               value={level.current}
               onChange={item => {
                 level.current = item.value
            
               }}
               labelField="label"
               valueField={level.current}
               placeholder="Level"
               searchPlaceholder="Search..."     
          />

          </View>



        {/* upload button */}
        <TouchableOpacity className="items-center mt-4 rounded-lg bg-main justify-end " onPress={handleUpload}>
            <Text className="text-lightmain text-xl font-ageomedium py-4 px-12  " >Upload</Text>
          </TouchableOpacity>
       </View>
    </View>
  )
}

export default Upload

const styles = StyleSheet.create({
  placeholderStyle: {
    color: '#393937',
    fontFamily: 'tilda-sans_regular',
    fontSize: 20,
  },
  dropdownContainer: {
    borderRadius: 5,
    height: 50,
    borderWidth: 1,
    padding: 16,
    marginVertical: 4,
    borderColor: '#3d5a80',
    marginBottom: 16,
    fontFamily: 'tilda-sans_regular',
    fontSize: 20
  },
  header:{
    backgroundColor: '#eaeaea',
    height: windowHeight/11,
    padding: 4,

},
container: {
  flex: 1,
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginTop: 25,
},
pdf: {
  flex:1,
  width:Dimensions.get('window').width,
  height:Dimensions.get('window').height,
}
})