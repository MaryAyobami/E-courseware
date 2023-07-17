import { StyleSheet, Text, View, TouchableOpacity, Image, ToastAndroid, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNTextDetector from 'rn-text-detector';
import { showMessage, hideMessage } from "react-native-flash-message";


const VerificationOption1 = ({navigation}) => {
  const [load, setLoad] = useState(false)
  const [state, setState] = useState({
    loading: false,
    image: null,
    toast: {
      message: '',
      isVisible: false,
    },
    textRecognition: null,
  });

  function onPress(type: 'capture' | 'library') {
    setState({ ...state, loading: true });
    type === 'capture'
      ? launchCamera({ mediaType: 'image' }, onImageSelect)
      : launchImageLibrary({ mediaType: 'image' }, onImageSelect);
  }

  async function onImageSelect(media: { assets: [{ uri: string }] }) {
    if (!media) {
      setState({ ...state, loading: false });
      return;
    }
    if (!!media && media.assets) {
      setLoad(true)
      const file = media.assets[0].uri;

      const textRecognition = await RNTextDetector.detectFromUri(file);
      // console.log(textRecognition)
      const JABU= 'JOSEPH AYO BABALOLA UNIVERSITY';
      //if match toast will appear
      // const matchText = textRecognition.findIndex((item: { text: string }) => item.text.includes(JABU));
       const ImageText = textRecognition[0]
       const matchText = ImageText.text
       const stringText = JSON.stringify(matchText)
       console.log(stringText)
        if(stringText.toLowerCase().includes(JABU.toLowerCase())){
          console.log('matched')
          setLoad(false)
          navigation.navigate('VerficationSucessful')
        }
        else{
          console.log('not matched')
          showMessage({
            message: `VERIFICATION FAILED, please try again!`,
              type: "default",
              backgroundColor:  '#ee6c4d',
            titleStyle: {
              fontFamily:"tilda-sans_medium",
              color:'#f8f1e9',
              fontSize: 16,
              padding: 4
            },
          })
        }
      setState({
        ...state,
        textRecognition,
        image: file,
        toast: {
          message: matchText > -1 ? 'Ohhh I love this company!!' : '',
          isVisible: matchText > -1,
        },
        loading: false,
      });
    }
  }

  return (
    <View className='bg-bgcolor w-screen h-screen' >
      <View className='w-[96%] mx-auto pt-8'>
   {
   load?
     <Text className='text-black text-[16px] font-ageomedium text-justify' >Upload your Student Identification Card for Verification.</Text>
    :
    <Text className='text-orange text-[16px] font-ageomedium text-center' >Verifying your Identity...</Text>
   }
     </View>
    
      {/* <View >
        <TouchableOpacity  onPress={() => onPress('capture')}>
          <Text>Take Photo</Text>
        </TouchableOpacity>
      </View> */}
      
      <View  className='w-[96%] mx-auto pt-8'>
        <TouchableOpacity  onPress={() => onPress('library')} className='text-center border border-main p-2 rounded-full bg-main '>
        {
          load?

          <ActivityIndicator/>
          :
          <Text className='text-bgcolor text-[16px] font-ageomedium text-center'>Select a Photo</Text>

        }
       
        </TouchableOpacity>
      </View>
      {/* <View >
        {state.loading ?
        <View>
          <View >
            <Image  source={{ uri: state.image }} />
          </View>
          {!!state.textRecognition &&
            state.textRecognition.map((item: { text: string }, i: number) => (
              <Text key={i} >
                {item.text}
              </Text>
            ))}
          </View>
          :
          <></>
}
      </View> */}
      {/* {state.toast.isVisible && ToastAndroid.showWithGravityAndOffset(state.toast.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)} */}
    </View>
  );
};

export default VerificationOption1;

const styles = StyleSheet.create({});
