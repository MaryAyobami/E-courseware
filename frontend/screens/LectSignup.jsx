import { ScrollView, StyleSheet, Text, TextInput, View,Image, Pressable, Button , } from 'react-native'
import React,{useState, useRef, useEffect, useContext} from 'react'
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import {data} from '../components/DepartmentData.js'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTogglePasswordVisibility } from '../components/hooks/useTogglePasswordVisibility';
import { showMessage, hideMessage } from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo";
import InternetCheck from '../components/InternetCheck';

import { AxiosContext } from '../components/context/AxiosContext.js';
import Loader from './Loader.jsx';

const LectSignup = ({navigation}) => {
  const {publicAxios} = useContext(AxiosContext);

  const [loading , setLoading] = useState(false)

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const validationerror = useRef('')

// student details
  const [name ,setName] = useState('')
  const [email, setEmail] = useState('')
 // const [matricnumber, setMatricnumber] = useState('')
  const [displayname, setDisplayname] = useState('')
  const [colege, setColege] = useState('')
  const [department, setDepartment] = useState('')
  //const [level, setLevel] = useState('')

// password visibility
  const { passwordVisibility, rightIcon, handlePasswordVisibility }= useTogglePasswordVisibility();
  const [password, setPassword] = useState('')
  const [passwordmsg, setMsg] = useState(false)
 
// department,college,level
  const departments = useRef([]);
  const levels = useRef([])
  const [collegeDepartment, setCollegeDepartment] = useState([])
  const [DepartmentLevels, setDepartmentLevels] = useState([])


  // internet check
  const [isOffline, setOfflineStatus] = useState(false); 
    
  const changeDepartments = (e) => {
    //  console.log(e)
     let filterDepartments = data.department.filter(   
       (item) => item.collegeId == parseInt(e.value.collegeId)
     );
 
     departments.current = filterDepartments;  
  //  console.log(departments.current)
     setCollegeDepartment(departments.current)
    //  console.log(collegeDepartment)
     setColege(e.value.collegeName)
     setValue(e.value.collegeName);
  
   };

  const changeLevels = (e) => {
    // console.log(e)
    let filterLevels = e.value.level
    // console.log(filterLevels)
    levels.current = filterLevels;  
    // console.log(levels.current)
    setDepartmentLevels(levels.current)
    setDepartment(e.value.name)
    setValue(e.value.name);
  
    // console.log(DepartmentLevels)
  };
 

  // handle signup
  const baseUrl = "http://localhost:8000"

  const handleSignup= ()=>{

    try{
      if(
        name=='' || email== '' || password=='' || college=='' || department==''
      ){
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
        const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
          const offline = !(state.isConnected && state.isInternetReachable);
          setOfflineStatus(offline);
        });
      
        removeNetInfoSubscription();
    
        publicAxios.post(`api/register-lecturer`,{
          name ,
          email ,
          password,
          department,
          college : colege,
          displayname
        }).
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
                    type: "default",
                    titleStyle: {
                      fontFamily:"tilda-sans_medium",
                      color:'#DFF0EB',
                      fontSize: 17,
                      padding: 4
                    },
                   backgroundColor: '#3b2e2a',
                   color:'#DFF0EB',
                })
              
           console.error("Axios request failed", err.response?.data, err.toJSON());
          } else {
            console.error(err);
          }
    
        }).finally(()=>setLoading(false))
      }
    }
    catch(e){
      console.log(e)
    }
  }


  return (
      <View className="h-screen bg-bgcolor ">
        <InternetCheck isOffline={isOffline} isRetry={handleSignup}/>
         {loading? <Loader/> : <></>}
    
    
    <View className='h-full w-[94%] mx-auto'>
      <View className='pb-12 pt-28'>
      <Text className="font-ageoheavy text-4xl  text-main">Sign Up</Text>
      </View>
     
      <ScrollView
      showsVerticalScrollIndicator= {false}

      style={{flex:1, paddingBottom: 60 }}
      automaticallyAdjustKeyboardInsets = {true}
      keyboardDismissMode= "on-drag"
      scrollToOverflowEnabled= {true}
      >
         <Text className='font-ageonormal  text-xl text-black py-0 px-1 m-0' >Name</Text>
         <TextInput className="font-ageonormal border border-main rounded-lg text-[20px] px-4 mt-0 mb-4 text-black focus:border-orange"  onChangeText={(text)=>setName(text)} />
         <Text className='font-ageonormal  text-xl text-black py-0 px-1 m-0' >Email</Text>
         <TextInput className="font-ageonormal border border-main rounded-lg px-4 mt-0 mb-4 text-[20px]  text-black  focus:border-orange" inputMode='email' onChangeText={(text)=>setEmail(text)} />

         
         {/* college */}
         <Text className='font-ageonormal  text-xl text-black py-0 px-1 m-0' >College</Text>
         <Dropdown
            data={data.college.map((item) => ({ value: item, label: `${item.collegeName}` }))}
            style={styles.dropdownContainer}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.placeholderStyle}
            inputSearchStyle={styles.placeholderStyle}
            value={value}
            onChange={(e)=> changeDepartments(e)}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder=""
            searchPlaceholder="Search..."
     
        // onChange={item => {
        //   setValue(item.value);
        // }}

  
      />

          {/* department */}
          <Text className='font-ageonormal  text-xl text-black py-0 px-1 m-0' >Department</Text>
          <Dropdown  
              data={departments.current.map((item) => ({ value: item , label: `${item.name}` }))}
              style={styles.dropdownContainer}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.placeholderStyle}
              inputSearchStyle={styles.placeholderStyle}
              value={value}
              onChange={(e)=> changeLevels(e)}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder=""
              searchPlaceholder="Search..."         
          />

          {/* level
          <Dropdown  
              data={levels.current.map((item)=>({ value: item , label: `${item}` }))}
              style={styles.dropdownContainer}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.placeholderStyle}
              inputSearchStyle={styles.placeholderStyle}
              search
              maxHeight={300}
              value={value}
              onChange={item => {
                setLevel(item.value)
                setValue(item.value);
              }}
              labelField="label"
              valueField="value"
              placeholder="Level"
              searchPlaceholder="Search..."         
          /> */}

         {/* <TextInput className="font-ageonormal border border-main rounded-full px-4 my-2 text-[20px]  text-black" placeholder='Displayname' onChangeText={(text)=>setDisplayname(text)}/> */}
         <View>
         <Text className='font-ageonormal  text-xl text-black py-0 px-1 m-0' >Password</Text>
         <Text className={passwordmsg?'text-orange font-ageobold mb-4 mt-0 pt-0 text-center': 'hidden'}>Must include: At least one UPPERCASE LETTER and SYMBOL. </Text>
          <TextInput className="font-ageonormal border border-main rounded-lg  focus:border-orange px-4 my-2 text-[20px]  text-black" name="password" 
          textContentType="newPassword"
          secureTextEntry={passwordVisibility}
          value={password}  
          autoCorrect={false} 
          enablesReturnKeyAutomatically
          onChangeText={text => setPassword(text)}
          onFocus={()=>setMsg(true)}
          />

          <Pressable onPress={handlePasswordVisibility} className='absolute top-0 right-4'>
              <Icon name={rightIcon} size={22} color='#ee6c4d'/>
          </Pressable>
         </View>
        
         
          <Pressable className="items-center mt-6 rounded-lg bg-main" onPress={handleSignup}>
            <Text className="text-bgcolor text-xl font-ageomedium py-4 px-12  " >SIGNUP</Text>
          </Pressable>
         <View className="flex  items-center p-4">
          <Text className="font-ageobold text-xl text-main">Register as a Student</Text>
          <Text className="font-ageobold text-xl text-main py-3">Have an account?   
          <Text onPress={()=> navigation.navigate('Login')} className="font-ageobold text-xl underline px-4 text-orange focus:text-main">Sign In</Text>
          </Text>
         </View>
      </ScrollView>
 </View>
    </View>
  )
}

export default LectSignup

const styles = StyleSheet.create({
  placeholderStyle: {
    color:'gray',
    fontFamily: 'AgeoPersonalUse',
    fontSize: 20
  },
  dropdownContainer: {
    borderRadius: 5,
    height: 50,
    borderWidth: 1,
    padding: 16,

    borderColor:'#3d5a80',
    marginBottom: 16,
    fontFamily: 'AgeoPersonalUse',
    fontSize: 20,
    marginBottom:20
  }
})