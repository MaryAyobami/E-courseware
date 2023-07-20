import { StyleSheet, Text, Touchable, TouchableOpacity, View ,Alert, Linking, Platform, Pressable, ActivityIndicator } from 'react-native'
import React,{useState,useContext} from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FileViewer from 'react-native-file-viewer';
import {AxiosContext} from '../components/context/AxiosContext';
import { storage } from '../screens/StuLogin';
// import RNFS from 'react-native-fs'
import ReactNativeBlobUtil from 'react-native-blob-util'
import RNFetchBlob from 'react-native-blob-util';
import {useFloating, shift} from '@floating-ui/react-native';

const Resource = (props) => {
    const{name, link , _id , sender, filesize, type, fileFormat, department, title, level, resources, publication_info , snippet} = props.res
    const [clicked, setClicked] = useState(false)
    const {authAxios} = useContext(AxiosContext);
    
    const [opening, setOpening] = useState(false)

   let modifiedname;

    if(name){
      modifiedname = name.split('.')[0]
    }
   
    const {refs, floatingStyles} = useFloating({
      middleware: [shift()],
    });

    let savedFiles = []
    if(storage.getString('savedResources')){
      const files = JSON.parse(storage.getString('savedResources'))
      
      savedFiles = [...files]
    }
    

    const openResource = () => {
      setOpening(true)
      setClicked(false)
      let uri = link;
      
      if (Platform.OS === 'ios') {
        uri = res.uri.replace('file://', '');
      }
      

      const docPath = RNFetchBlob.fs.dirs.DocumentDir;
      const filePath = `${docPath}/${name}`;
      ReactNativeBlobUtil
        .config({
            // add this option that makes response data to be stored as a file,
            // this is much more performant.
            path: filePath,
            fileCache: true,
        })
        .fetch('GET', `${link}`, {
            //some headers ..
        })
        .then((res) => {
            // the temp file path
            
            
            FileViewer.open(res.path(), { showOpenWithDialog: true })
            .then(() => {
              
              setOpening(false)
            })
            .catch(_err => {
              
            }); 

        })
    
      }
   const saveResource  = () =>{

      let uri = link;
        
        if (Platform.OS === 'ios') {
          uri = res.uri.replace('file://', '');
        }
        
          const docPath = RNFetchBlob.fs.dirs.DocumentDir;
          const filePath = `${docPath}/${name}`;
          
          ReactNativeBlobUtil
            .config({
                // add this option that makes response data to be stored as a file,
                // this is much more performant.
                path: filePath,
                fileCache: true,
            })
            .fetch('GET', `${link}`, {
                //some headers ..
            })
            .then((res) => {
                // the temp file path
                
                
                savedFiles.push({'name':modifiedname,'uri': res.path()})
                
                storage.set('savedResources', JSON.stringify(savedFiles))
                
               
            })
          
          return(
             Alert.alert('Saved',
            'Resource has been successfully saved for offline access'
            )
          )

          }


  return (
    <View className='w-screen py-2 relative'>

      <Pressable className='w-[96%]  mx-auto bg-gray py-4 rounded-lg shadow-2xl ' >
        {
          opening?
          <View className='flex flex-row justify-items-center items-center align-middle'>
            <Text className="font-ageonormal text-[18px] text-main text-center  p-2 ">opening</Text>
          <ActivityIndicator color={'#ee6c4d'} style={{paddingTop:4}}/>
          </View>
          :
      <View className="flex flex-row w-[100%] items-center justify-between mx-auto my-2 ">
        
        <View className='flex flex-row w-[90%]'>
        <Icon
          name="square-small"
          size={30}
          color= '#3d5a80'
          style={{ marginLeft: 1 }}
        />
        <Text 
        onPress = {
          ()=>{
            name?

            Alert.alert('Details',`
            Name : ${modifiedname}
            Department : ${department}
            Level : ${level}
            Resource Type : ${type}
            Size : ${filesize}kb
            Sender : ${sender}
            `)
            :
            
            Alert.alert('Details',
            `
            Title : ${title}
            Author:${publication_info.summary.split('-')[0]}
            Summary: ${publication_info.summary} 
            ${snippet}
            

                     `
            )
          }
        }
        
        className="font-ageonormal text-[18px] text-grey-800 w-[95%]">{name? modifiedname: title }</Text>
        </View>

        <TouchableOpacity onPress={()=> setClicked(true)}>
          <Icon
            name="dots-vertical"
            size={30}
            color='#ee6c4d'
            style={{ marginLeft: 1 }}
          />
          </TouchableOpacity> 

        
          
        </View>

      }

  </Pressable>

    {/* <View>
      <Text>{name}</Text>
      <Text></Text>
    </View> */}

          {/* details */}
          <View  
          
          className= {clicked ? "flex flex-row flex-end absolute  bg-main w-[35%] justify-end translate-x-64 translate-y-0 z-1" : "hidden"  }  
           >
        <View className='pl-4 '>
          <TouchableOpacity className="font-ageonormal text-[18px]  text-bgcolor px-2 pt-0" onPress={openResource}>
           <Text className="font-ageonormal text-[16px] text-bgcolor p-2  " >View</Text>
          </TouchableOpacity>
         <TouchableOpacity  className="font-ageonormal text-[18px] text-bgcolor px-2 " onPress={saveResource}>

        <Text className="font-ageonormal text-[16px] text-bgcolor p-2 ">Save</Text> 
         </TouchableOpacity>
       
       <TouchableOpacity className="font-ageonormal text-[18px] text-bgcolor px-2 " onPress={() => Linking.openURL(link)}>
        <Text className="font-ageonormal text-[16px] text-bgcolor p-2 " >Download</Text>
       </TouchableOpacity>
        
        </View>
        <View>
        <TouchableOpacity onPress={()=>setClicked(false)} className='px-2'>
          <Icon
            name="close"
            size={20}
            color='#eaeaea'
            style={{paddingRight: 4}}

          />
          </TouchableOpacity> 
        </View>
      </View>
    </View>
  )
}

export default Resource


const styles = StyleSheet.create({})