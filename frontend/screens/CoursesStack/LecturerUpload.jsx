import { StyleSheet, Text, View,TextInput,Pressable, TouchableOpacity, Dimensions, ScrollView} from 'react-native'
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
import Loader from '../Loader.jsx';
import {fileTypeFromFile} from 'file-type';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const ShowPdf = (props) =>{
  return(
      <View style={styles.container}>
                <Pdf
                    source={props.source}
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

const LecturerUpload = ({navigation}) => {


  const {publicAxios} = useContext(AxiosContext);
  const {authAxios} = useContext(AxiosContext);

  

  // resou5rce details
  const name = useRef('')
  const type = useRef('')
  const department = useRef('')
  const level = useRef('')
  const [resource , setResource] = useState('')
  const [preview, setPreview] = useState(false)
  const [open, setOpen] = useState(false);
 // const [value, setValue] = useState(null);
  const validationerror = useRef('')
  
  const [loading, setLoading] = useState(false)
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

// if (fileResponse != []){
//   const source =  fileResponse.current.uri
// }
const validateFileType = (fileUri) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint'];
  const mimeType = await fileTypeFromFile(fileUri);

  return allowedTypes.includes(mimeType.mime);
};



const handleDocumentSelection = useCallback(async () => {
  try {
    const response = await DocumentPicker.pick({
      presentationStyle: 'fullScreen',
      
    });
    console.log(response)

    if (response != ''){
      const isValidFile = validateFileType(response[0]);
      if(isValidFile){
        fileResponse.current = response[0]      
        console.log(fileResponse.current)
        setFilename(fileResponse.current.name)   
        
      }

      else{
        showMessage({
          message: `Invalid file type! only jpeg,png,pdf,docx and ppt files are supported`,
            type: "default",
            backgroundColor: '#3b2e2a',
          titleStyle: {
            fontFamily:"tilda-sans_medium",
            color:'#f8f1e9',
            fontSize: 16,
            padding: 4
          },
        })
      
      fileResponse.current = ''
      }
    
  }} catch (err) {
    console.warn(err);
  }
}
, []);



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
  
  setLoading(true)
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
         navigation.navigate('UploadSuccessfull')
      }
      console.log(response.data);
    }).
    catch((err)=>{   
      setLoading(false)
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
  setLoading(false)
  console.log(e)
 }
}

const handlePreview = ()=>{
  // const source = `${{uri: fileResponse.current}}`
  console.log(fileResponse.current.uri)
           return(
              <View style={styles.container}>
                  <Pdf
                      source={fileResponse.current.uri}
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
    <View className='w-screen flex-1  bg-bgcolor '>
        <View style={styles.header} className='rounded-b-full'>
        <View className='h-full  bg-gray rounded-b-full w-screen'>
        <TouchableOpacity onPress={()=>navigation.goBack()} className='pl-4 pt-2'>
          <Icon name='arrow-left' size={30} color=  '#3d5a80' />
      </TouchableOpacity>
        <Text className="text-[27px] font-ageobold text-main text-center mb-2 ">Upload</Text>
        </View>
          
        </View>

       <View className='w-[95%] mx-auto py-4'>
         
          <Text className='font-ageonormal text-[12px] text-center text-grey-800'>The learning materials uploaded here will be saved to the central database.</Text>
       </View>

{
  loading?
  <Loader/>
  :

       <ScrollView 
        // showsVerticalScrollIndicator= {false}
        style={{paddingBottom:400 , flex:1}}
        automaticallyAdjustKeyboardInsets = {true}
        keyboardDismissMode= "on-drag"
        scrollToOverflowEnabled= {true}

        className='w-[95%] mx-auto pt-4'>
                {/* file */}   
          
         
          <TouchableOpacity className="items-center rounded-full border border-main" onPress={handleDocumentSelection}>
           <Text className="text-main  text-[16px] font-ageomedium py-3  px-12  ">Select File</Text>
          </TouchableOpacity>
            
          <Text className="text-main text-center  text-[16px] font-ageomedium py-4 px-12  ">{filename} </Text>
          {
            filename && 
            <TouchableOpacity onPress={()=>setPreview(true)}>
              <Text className="text-orange text-center text-[14px] font-ageoheavy py-2 px-12  ">PREVIEW FILE</Text>
            </TouchableOpacity>
      
          }


        {
          preview?
          <ShowPdf source={{uri : `${fileResponse.current.uri}` }}/>
          :
          <></>
        }

          {/* name */}
          {/* <View className='py-2'>
            <Text className='text-[16px] font-ageomedium text-grey-800'>Name</Text>
            <TextInput className="font-ageonormal border border-main rounded-full text-[20px] px-4 my-3 text-black" placeholder="e.g CSC 411 Lecture Note" onChangeText={(text)=>setName(text)}/>
          </View> */}
          {/* type */}
          <View className='py-2'>
            <Text className='text-[16px] font-ageomedium text-grey-800'>Type</Text>
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
             <Text className='text-[16px] font-ageomedium text-grey-800'>Department</Text>
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
            <Text className='text-[16px] font-ageomedium text-grey-800'>Level</Text>
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
            <Text className="text-lightmain text-[16px] font-ageomedium py-4 px-12  " >Upload</Text>
          </TouchableOpacity>

          <View className='p-6'>

          </View>
       </ScrollView>

              }
    </View>
  )
}

export default LecturerUpload

const styles = StyleSheet.create({
  placeholderStyle: {
    color: '#393937',
    fontFamily: 'tilda-sans_regular',
    fontSize: 16,
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
    height: windowHeight/10,
    padding: 0,

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