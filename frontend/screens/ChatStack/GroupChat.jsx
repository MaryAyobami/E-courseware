import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as TalkRn from '@talkjs/react-native';
import { storage } from '../StuLogin';

const GroupChat = ({navigation,route}) => {

  const {members, currentuser , currentlevel}= route.params
  

  const me = {
    id: '1',
    name: storage.getString('user.name'),
    email: storage.getString('user.email'),
    photoUrl: 'https://talkjs.com/images/avatar-1.jpg',
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
      photoUrl: 'https://talkjs.com/images/avatar-1.jpg',
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
        <TalkRn.Session appId='tsGSO0Vc' me={me}>
        <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
      </TalkRn.Session>
  )
}

export default GroupChat

const styles = StyleSheet.create({})