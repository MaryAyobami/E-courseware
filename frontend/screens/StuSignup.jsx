import { ScrollView, StyleSheet, Text, TextInput, View,Image, Pressable, Button , } from 'react-native'
import React,{useState, useRef, useEffect, useContext} from 'react'
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import {data} from '../components/DepartmentData.js'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTogglePasswordVisibility } from '../components/hooks/useTogglePasswordVisibility';
import { showMessage, hideMessage } from "react-native-flash-message";
import { AxiosContext } from '../components/context/AxiosContext.js';
import NetInfo from "@react-native-community/netinfo";
import InternetCheck from '../components/InternetCheck';

const StuSignup = ({navigation}) => {
  const {publicAxios} = useContext(AxiosContext);

  const [loading , setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const validationerror = useRef('')

// student details
  const [name ,setName] = useState('')
  const [email, setEmail] = useState('')
  const [matricnumber, setMatricnumber] = useState('')
  const [displayname, setDisplayname] = useState('')
  // const [colege, setColege] = useState('')
  const colege = useRef('')
  const [department, setDepartment] = useState('')
  const [level, setLevel] = useState('')

// password visibility
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
  useTogglePasswordVisibility();
  const [password, setPassword] = useState('')
 
// department,college,level
  const departments = useRef([]);
  const levels = useRef([])
  const [collegeDepartment, setCollegeDepartment] = useState([])
  const [DepartmentLevels, setDepartmentLevels] = useState([])


// internet check
    const [isOffline, setOfflineStatus] = useState(false);
    useEffect(() => {
      const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
        const offline = !(state.isConnected && state.isInternetReachable);
        setOfflineStatus(offline);
      });
     console.log('testing')
     console.log(isOffline)
      removeNetInfoSubscription();
    },[]);

    
  const changeDepartments = (e) => {
  
     let filterDepartments = data.department.filter(   
       (item) => item.collegeId == parseInt(e.value.collegeId)
     );
 
     departments.current = filterDepartments;  
  //  console.log(departments.current)
     setCollegeDepartment(departments.current)
    //  console.log(collegeDepartment)
    
    //  setValue(e.value.collegeName);
  
   };

  const changeLevels = (e) => {
    // console.log(e)
    let filterLevels = e.value.level
    // console.log(filterLevels)
    levels.current = filterLevels;  
    // console.log(levels.current)
    setDepartmentLevels(levels.current)
    setDepartment(e.value.name)
    // setValue(e.value.name);
  
    // console.log(DepartmentLevels)
  };
 

  // handle signup
  const handleSignup= ()=>{
    publicAxios.post(`api/register-student`,{
      name ,
      matricnumber, 
      email ,
      password,
      department,
      college : colege.current,
      level,
      displayname
    }).
    then((response) => {
      if(response.status == 201){
         navigation.navigate('RegistrationSuccess')
      }
      console.log(response.data);
    }).
    catch((err)=>{   

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
               backgroundColor: '#732955',
               color:'#DFF0EB',
            })
          
       console.error("Axios request failed", err.response?.data, err.toJSON());
     
    })
  }


  return (
    <View className="h-screen bg-white">
    {/* internet check */}
    <InternetCheck isOffline={isOffline}/>

    {loading? <ActivityIndicator size="large" style={styles.indicator} color={'#FF8552'} />: 
    <View>
      <View>
        <Image source={require('../assets/reading.png')} style={{width: '100%', height:250}} resizeMode="contain"/>
      </View>
      <View className='pb-8'>
      <Text className="font-ageoheavy text-4xl text-center text-green">Sign Up</Text>
      </View>
      <View className='flex-1 w-[90%] mx-auto pb-16' >
      <ScrollView
      showsVerticalScrollIndicator= {false}

      style={{flex:1, paddingBottom: 30 }}
      automaticallyAdjustKeyboardInsets = {true}
      keyboardDismissMode= "on-drag"
      scrollToOverflowEnabled= {true}
      >
         <TextInput className="font-ageonormal border border-green rounded-full text-[20px] px-4 my-2 text-black" placeholder='Name' onChangeText={(text)=>setName(text)} />
         <TextInput className="font-ageonormal border border-green rounded-full px-4 my-2 text-[20px]  text-black" placeholder='Email' inputMode='email' onChangeText={(text)=>setEmail(text)} />
         <TextInput className="font-ageonormal border border-green rounded-full px-4 my-2 text-[20px]  text-black" placeholder='Matric number' onChangeText={(text)=>setMatricnumber(text)}/>
         
         {/* college */}
         <Dropdown
            data={data.college.map((item) => ({ value: item, label: `${item.collegeName}` }))}
            style={styles.dropdownContainer}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.placeholderStyle}
            inputSearchStyle={styles.placeholderStyle}
            value={colege.current}
            onChange={(item)=> {
              console.log(item)
              colege.current=item.value.collegeName
              console.log(colege.current)
              changeDepartments(item)
            }}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="College"
            searchPlaceholder="Search..."
     
        // onChange={item => {
        //   setValue(item.value);
        // }}

  
      />

          {/* department */}
          <Dropdown  
              data={departments.current.map((item) => ({ value: item , label: `${item.name}` }))}
              style={styles.dropdownContainer}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.placeholderStyle}
              inputSearchStyle={styles.placeholderStyle}
              value={department}
              onChange={(item)=> changeLevels(item)}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Department"
              searchPlaceholder="Search..."         
          />

          {/* level */}
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
                setLevel(item.value)
              }}
              labelField="label"
              valueField="value"
              placeholder="Level"
              searchPlaceholder="Search..."         
          />

         <TextInput className="font-ageonormal border border-green rounded-full px-4 my-2 text-[20px]  text-black" placeholder='Displayname' onChangeText={(text)=>setDisplayname(text)}/>
         <View>
          <TextInput className="font-ageonormal border border-green rounded-full px-4 my-2 text-[20px]  text-black" placeholder='Password' name="password" 
          textContentType="newPassword"
          secureTextEntry={passwordVisibility}
          value={password}  
          autoCorrect={false} 
          enablesReturnKeyAutomatically
          onChangeText={text => setPassword(text)}
          />

          <Pressable onPress={handlePasswordVisibility} className='absolute top-6 right-4'>
              <Icon name={rightIcon} size={22} color="#297373" />
          </Pressable>
         </View>
        
         
          <Pressable className="items-center mt-4 rounded-full bg-green" onPress={handleSignup}>
            <Text className="text-gray text-xl font-ageomedium py-4 px-12  " >SIGNUP</Text>
          </Pressable>
         <View className="flex  items-center p-4">
          <Text className="font-ageobold text-xl text-green">Register as a Lecturer</Text>
          <Text className="font-ageobold text-xl text-green py-3">Have an account?   
          <Text onPress={()=> navigation.navigate('Login')} className="font-ageobold text-xl underline px-4 text-black focus:text-green">Sign In</Text>
          </Text>
         </View>
      </ScrollView>
      </View>
     </View>
   }
    </View>
  )
}

export default StuSignup

const styles = StyleSheet.create({
      placeholderStyle: {
        color:'gray',
        fontFamily: 'tilda-sans_regular',
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
        fontFamily: 'tilda-sans_regular',
        fontSize: 20
      },
      inputSearchStyle:{
        color: '#393937',
        fontSize: 16,
        fontFamily: 'tilda-sans_regular'
      },
      selectedTextStyle:{
        color: '#393937',
        fontSize: 16,
        fontFamily: 'tilda-sans_regular'
      }
})

