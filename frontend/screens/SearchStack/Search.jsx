import { StyleSheet, Text, View , TextInput, Pressable, Button, TouchableOpacity, Keyboard , FlatList,ActivityIndicator, ScrollView, Dimensions} from 'react-native'
import React, { useRef, useState,useContext, useEffect } from 'react'
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Resource from '../../components/Resource';
import {AxiosContext} from '../../components/context/AxiosContext';
import {data} from '../../components/DepartmentData.js'
import { Dropdown } from 'react-native-element-dropdown';
import CheckBox from '@react-native-community/checkbox';
import { Spinner } from '../Spinner';
import Loader from '../Loader';
import { showMessage, hideMessage } from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo";
import InternetCheck from '../../components/InternetCheck';

const Search = ({navigation}) => {
  
  const {publicAxios} = useContext(AxiosContext);

  const [ searchterm , setSearchterm] = useState('')
  const [ clicked, setClicked] = useState()
  const [ showFilter, setShowFilter] =useState(false)
  const [ loading, setLoading] = useState()
  const [websearch, setwebsearch] = useState(false)
  // const [ filterdepartment, setfilterdepartment] = useState()
  // const [ filtertype, setfiltertype] = useState()
  // const [ filterlevel, setfilterlevel] = useState()
  
  const [Data, setData] = useState(data.resourceType)

  const handleCheckbox = (item) => {
    const index = Data.findIndex(x => x == item);
    const datasClone = [...Data];
    datasClone[index].state = !datasClone[index].state;
    setData(datasClone);
    }

// internet connection check
const [isOffline, setOfflineStatus] = useState(false) 
    

  const resources = useRef([])
  const [searchResult, setSearchResult] = useState()
    // filter
    const type = useRef('Type')
    const department = useRef('Department')
    const level = useRef('Level')
  
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
  
    const [isSelected, setSelection] = useState(false);

  // show filter side
  const showFilterBar = () =>{
      if(showFilter){
        setShowFilter(false)
      }
      else{
        setShowFilter(true)
      }
  }

 // filtering
  let filteredresources;

  useEffect(()=>{
      console.log(department.current,type.current,level.current)
    
      if(searchResult != null && department.current != '' || type.current != '' || level.current != ''){
        filteredresources = resources.current.filter((item)=>item.department == department.current || item.level == level.current && item.type || type.current )
        setSearchResult(filteredresources)
      }
     
      console.log(filteredresources)
    
  //   }
  //  else{ 
  //   setSearchResult(resources.current)

  //  }
    console.log(searchResult)
  },[department.current])


  const handleSearch = async() => {
    try{
      Keyboard.dismiss()
      if(searchterm == ''){
        showMessage({
          message: `The search field cannot be empty!`,
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
        publicAxios.get(`/api/search/?searchterm=${searchterm}`)
        .then((response)=>
        {
       
        console.log(response.data)
        resources.current = response.data
        setSearchResult(resources.current)
        console.log(searchResult)
        }
        )
        .catch(err=>{
          console.log(err)
            if (err.response) {
              showMessage({
                message: `A server error has occured, please try again!`,
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
            else if(err.request) {
    
             const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
                const offline = !(state.isConnected && state.isInternetReachable);
                setOfflineStatus(offline);
              });
               

              removeNetInfoSubscription();
              console.log(isOffline)
            }
          
          })
        .finally(() => {
          setLoading(false);
        });
      }

    }
    catch(err){
      if (err.response) {
        console.log(err.response)
        showMessage({
          message: `A server error has occured, please try again!`,
            type: "default",
            backgroundColor:  '#ee6c4d',
          titleStyle: {
            fontFamily:"tilda-sans_medium",
            color:'#f8f1e9',
            fontSize: 16,
            padding: 4
          },
        })
  } else {
    console.error(err);
  }

    }
  }

  return (

    <View className='w-screen flex-1 bg-bgcolor'>
        <InternetCheck isOffline={isOffline} isRetry={handleSearch}/>
       <View className='h-24  w-screen justify-center items-center flex flex-row'> 
     {/* <Icon name="book-open-page-variant-outline" size={30} color='#ee6c4d'  style={{paddingVertical:4}} onPress={()=> navigation.goBack()} /> */}
       <Text className='p-4 text-center text-main font-ageobold text-4xl'>Search</Text>
     </View>


    <View className= 'w-[96%] flex flex-row  py-2 mx-auto'>
    {clicked && (
      <View className='p-2'>
        <TouchableOpacity
          onPress={() => {
            setSearchterm("")
            Keyboard.dismiss();
            setClicked(false);
            setLoading(false)
            setSearchResult('')
          }}
        >
          <Text className="text-orange text-xl font-ageobold">Cancel</Text>
        </TouchableOpacity>
      </View>
    )}

    <View className={clicked? " border border-main rounded-full text-[20px] pl-4 pr-2  w-[80%] mx-auto text-black" : "border border-main rounded-full text-[20px] pl-4 pr-2  w-[100%] text-black" }>
      
    <View
      style={
        clicked
          ? styles.searchBar__clicked
          : styles.searchBar__unclicked
      }
    >
        
      {/* Input field */}
      <TextInput
        className="font-ageonormal text-black w-[90%] text-xl px-2"
        // placeholder="Search"
        value={searchterm}
        onChangeText={text=>setSearchterm(text)}
        onFocus={() => {
          setClicked(true);
        }}
      />

        {/* search Icon */}
        <TouchableOpacity   onPress={handleSearch} >
        <Icon
          name="magnify"
          size={30}
          color="#3d5a80"
          style={{ marginLeft: 1 }}
        />
      </TouchableOpacity>
    
      {/* cross Icon, depending on whether the search bar is clicked or not */}
      {/* {clicked && (
        <Icon name="close"   size={30}
        color='#E9D758' style={{ padding: 1 }} onPress={() => {
            setSearchterm("")
            Keyboard.dismiss();
            setClicked(false);
        }}/>
      )} */}

    </View>
    {/* cancel button, depending on whether the search bar is clicked or not */}
   
  </View>

 
  </View>
   
{/* search and filter */}

{loading? <Loader/>: 

// overlay


    <View className=' w-screen'>
      <View className={showFilter?'flex flex-row w-screen justify-between mt-3 ':'flex flex-row w-screen justify-center mt-3 ' }>


    <TouchableOpacity onPress={showFilterBar} className={showFilter?'text-center bg-main p-2' : 'px-1 text-center'}>
                <View className='flex flex-row  z-10 ' >
                <Icon
                name="filter-variant"
                size={30}
                color={ showFilter?'#ee6c4d':"grey"}
                style={{ marginLeft: 1 , padding:2}}
              />
              <Text  className={showFilter?"font-ageobold p-2 text-xl text-orange " : 'hidden'}>Filter Result</Text>
                  </View>
      </TouchableOpacity>

    <Text  className={showFilter? 'hidden': "font-ageobold p-2 px-8 text-xl text-grey-800"}>Search Result</Text>
    </View>
      
      {/* {showFilter? <View className='bg-blue w-[35%] h-full opacity-10'>
      </View> : ''}

{/* filter area  */}


<View  className='flex '>


<View className={showFilter?  ' p-2 bg-main rounded-b-lg  shadow-lg' : 'hidden'}> 
<ScrollView
horizontal={true}
contentContainerStyle={{
  justifyContent: 'space-between',
  flex:1,
  alignContent: 'center'

}}
>
       <View className='w-[35%]'>
        <Text className='font-ageomedium p-2 text-xl text-bgcolor'>Department</Text>
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
            placeholder={department.current}
            searchPlaceholder="Search..."         
        />
        </View>

        {/* level */}
    <View className='w-[30%]'>
      <Text className='font-ageomedium p-2 text-xl text-bgcolor'>Level</Text>
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
             placeholder={level.current}
             searchPlaceholder="Search..."     
        />
      </View>

       {/* type */}
       <View className='w-[30%]'>
        <Text className='font-ageomedium p-2 text-xl text-bgcolor'>Type</Text>
        <Dropdown  
             data={data.resourceType.map((item)=>({ value: item , label: `${item.name}` }))}
             style={styles.dropdownContainer}
             placeholderStyle={styles.placeholderStyle}
             selectedTextStyle={styles.placeholderStyle}
             inputSearchStyle={styles.placeholderStyle}
             search
             maxHeight={300}
             value={type}
             onChange={item => {
               console.log(item)
               type.current = item.value.name
          
             }}
             labelField="label"
             valueField={type.current}
             placeholder={type.current}
             searchPlaceholder="Search..."     
        />
      {/* {
   
      Data.map((item)=>
        {
          return(
            <View key={item.id} className='flex flex-row'>
              <CheckBox
              value={item.state}
              onChange={()=>{
                handleCheckbox(item)}}
              style={styles.checkbox}
            />
            <Text className="font-ageonormal p-2 text-[18px] text-grey-800">{item.name}</Text>
            </View>
          )
        }
        
        )}  */}
     
       </View>
         
</ScrollView>
      </View>

         
          {/* resource list */}

{searchResult? 
      <View className='w-[98%] mx-auto pt-8 ' >
    
        <FlatList
                data={searchResult}
                renderItem = {({item})=>
                  <Resource res={item}/>    
                }
                keyExtractor={item => item._id}
                // contentContainerStyle={{
                //   flexGrow: 1,
                //   }}
              
                // refreshControl={
                //   <RefreshControl refreshing={refreshing} onRefresh={getTasks} size={'large'} colors={['gray']} />
                // }
                />
          
       </View>
     :
 <></>

  }
</View>

 </View>

}
  {/* online database button */}
  <View style={styles.websearch} className=''>
    <Pressable className='bg-main w-[20%] flex flex-row text-center rounded-tl-full p-2' onPress={()=>navigation.navigate('Web Search')}>
    <Icon
          name="search-web"
          size={55}
          color= '#ee6c4d'
          style={{
             marginLeft: 15,
             width: '100%',
             alignItems: 'center',
             justifyContent: 'center',
            }}
        />
        <Text className={websearch? 'flex text-bgcolor texl-xl': 'hidden'}>Search online libraries of academic resources</Text>
      </Pressable>
  </View>
  </View>
  )
}

export default Search


const styles = StyleSheet.create({

  searchBar__unclicked: {
    padding: 2,
    flexDirection: "row",
    width: "100%",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 2,
    flexDirection: "row",
    width: "100%",

    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
  placeholderStyle: {
    color:'#eaeaea',
    fontFamily: 'tilda-sans_regular',
    fontSize: 18
  },
  dropdownContainer: {
    borderRadius: 5,
    height: 50,
    borderWidth: 1,
    padding: 16,
    marginVertical: 4,
    borderColor: '#eaeaea',
    marginBottom: 16,
    fontFamily: 'tilda-sans_regular',
    fontSize: 20
  },
  checkbox: {
    alignSelf: 'center',
  },
  indicator: {
    backgroundColor: '#DFF0EB',
    height: Dimensions.get('window').height,
  },
  Button:{
    fontSize: 20
  }
  ,
  websearch:{
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 0,
    alignContent:'flex-end',
    alignItems: 'flex-end'
  }
});