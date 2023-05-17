import { StyleSheet, Text, Touchable, TouchableOpacity, View , Linking, Platform, Pressable } from 'react-native'
import React,{useState,useContext} from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FileViewer from 'react-native-file-viewer';
import {AxiosContext} from '../components/context/AxiosContext';
import { storage } from '../screens/StuLogin';
import RNFS from 'react-native-fs'

const Resource = (props) => {
    const{name,link , resourceId, sender, fileSize, type, fileFormat} = props
    const [clicked, setClicked] = useState(false)
    const {authAxios} = useContext(AxiosContext);
    

    const savedFiles = []

    const openResource = () => {
      let uri = link;
      console.log('pressed')
      if (Platform.OS === 'ios') {
        uri = res.uri.replace('file://', '');
      }
      console.log('URI : ' + uri);
      const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${name}`
      RNFS.downloadFile({
        fromUrl: `${uri}`,
        toFile: localFile
        }).promise.then(
        ()=>{
          FileViewer.open(uri,{ showOpenWithDialog: true })
          .then(() => {
            console.log('Success');
          })
          .catch(_err => {
            console.log(_err);
          }); 
        }
        );
        
        // const path = ${RNFS.DocumentDirectoryPath}/sample.pdf;
        // const fileExists = await RNFS.exists(path);
        // if (fileExists) {
        // //we already have it in local storage
        // return {
        // url: "file://" + path,
        // };    
    

   const saveResource  = () =>{
        try{
          savedFiles.push({'name':name,'uri': link})
          storage.set('savedResources', JSON.stringify(savedFiles))
          
          authAxios.put(`/api/save-resource`,{resourceId})
          .then((response)=>

          {
          console.log(response.data)
        
          }
          )
          .catch((err)=>console.log(err))
        }
        catch(err){
      //     if (axios.isAxiosError(err)) {
      //       console.error("Axios request failed", err.response?.data, err.toJSON());
      // } else {
        console.error(err);
        
  

    }
   }


  return (
    <View className='border border-b-gray border-x-0 border-t-0 w-screen '  >
      <Pressable onPress={openResource} className='w-[96%] mx-auto  '>
      <View className="flex flex-row w-[100%] items-center justify-between mx-auto my-2 ">
        
        <View className='flex flex-row'>
        <Icon
          name="square-small"
          size={30}
          color="#297373"
          style={{ marginLeft: 1 }}
        />
        <Text className="font-ageonormal text-xl text-grey-800 ">{name}</Text>
        </View>

        <TouchableOpacity onPress={()=> setClicked(true)}>
          <Icon
            name="dots-vertical"
            size={30}
            color="#297373"
            style={{ marginLeft: 1 }}
          />
          </TouchableOpacity> 

        
          
        </View>

      {/* details */}
      <View  className= {clicked ? "flex flex-row bg-gray w-[35%] justify-end  relative -top-12 left-50 z-1 " : "hidden" } >
        <View className='pl-4'>
        <Text className="font-ageonormal text-xl text-green p-2 pt-4">Details</Text>
        <Text className="font-ageonormal text-xl text-green p-2 " onPress={saveResource}>Save</Text>
        <Text className="font-ageonormal text-xl text-green p-2 " onPress={() => Linking.openURL(link)} >Download</Text>
        </View>
        <View>
        <TouchableOpacity onPress={()=>setClicked(false)}>
          <Icon
            name="close"
            size={25}
            color="#297373"
            style={{paddingRight: 4}}

          />
          </TouchableOpacity> 
        </View>
      </View>

  </Pressable>

    {/* <View>
      <Text>{name}</Text>
      <Text></Text>
    </View> */}
    </View>
  )
}

export default Resource

const styles = StyleSheet.create({})