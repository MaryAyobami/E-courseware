import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as TalkRn from '@talkjs/react-native';
import { storage } from '../StuLogin';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../Loader';

const GroupChat = ({navigation,route}) => {

  const {members, currentuser , currentlevel}= route.params
  
 useEffect(()=>{
  console.log(currentuser)
 })
  const me = {
    id: currentuser._id,
    name: storage.getString('user.name'),
    email: storage.getString('user.email'),
    photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJQ-NCMFIn2rSYyVUZDyaXP6yau90cTKhBk9BnARSrGQ&s',
    // welcomeMessage: 'Hey there! How are you? :-)',
    role: 'default',
  };

  let member;

  const conversationId = `${currentlevel}`
  const conversationBuilder = TalkRn.getConversationBuilder(conversationId);

  members.map((item)=>{

    member = {

      id: item._id,
      name: item.name,
      email: item.email,
      // photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJQ-NCMFIn2rSYyVUZDyaXP6yau90cTKhBk9BnARSrGQ&s',
      // welcomeMessage: 'Hey there! How are you? :-)',
      role: 'default',
    };

   if(member.level == currentuser.level){
      conversationBuilder.setParticipant(me, {access: 'ReadWrite'});
      conversationBuilder.setParticipant(member);
   }
    
    else{
      conversationBuilder.setParticipant(me, {access: 'ReadWrite'});
      conversationBuilder.setParticipant(member);
    }
   
  })
 

 

//   conversationBuilder.setAttributes({
//     photoUrl: "https://demo.talkjs.com/img/11.jpg",
//     subject: "Beautiful Steel Preserve for rent!"
// });

  return (
    <>
       <View  className=' '>
        <View className=' bg-gray  w-screen'>
        <TouchableOpacity onPress={()=>navigation.goBack()} className='pl-4 mt-2'>
          <Icon name='arrow-left' size={30} color= '#3d5a80' />
      </TouchableOpacity>
        <Text className="text-[27px] font-ageobold text-main text-center pb-02  ">{currentlevel} level</Text>
        </View>
          
        </View>
        {members.length === 0 ? (
           <View className='flex-1 bg-gray justify-center items-center'> 
           
            <Icon name='chat-remove-outline' size={200} color='#e0fbfc' />
            <Text  className="text-[18px] font-ageobold text-main text-center p-4  ">No available chat for this forum, as there are no registered participants.</Text>
           </View>
          ) : (
            <TalkRn.Session appId='tsGSO0Vc' me={me}>
            <TalkRn.Chatbox conversationBuilder={conversationBuilder}  loadingComponent=<Loader/> 
            messageField={{
              autofocus: 'smart',
              enterSendsMessage: false,
              placeholder: 'Send a message',
              spellcheck: true,
              visible: {
                // Show the message field only if user access is set to 'ReadWrite'
                access: ['==', 'ReadWrite']
              }
            }}
            />
          </TalkRn.Session>
          )}
      
    </>
       
  )
}

export default GroupChat

const styles = StyleSheet.create({})