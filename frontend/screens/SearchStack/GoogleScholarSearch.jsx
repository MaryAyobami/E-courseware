
import { StyleSheet, Text, View , TextInput, Pressable, Button, TouchableOpacity, Keyboard , FlatList,ActivityIndicator, ScrollView, Dimensions} from 'react-native'
import React, { useRef, useState,useContext, useEffect } from 'react'
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Resource from '../../components/Resource';
import {AxiosContext} from '../../components/context/AxiosContext';
import InternetCheck from '../../components/InternetCheck';
import {data} from '../../components/DepartmentData.js'
import { Dropdown } from 'react-native-element-dropdown';
import CheckBox from '@react-native-community/checkbox';
import Axios from 'axios';
import Loader from '../Loader';
import { showMessage, hideMessage } from "react-native-flash-message";


const GoogleScholarSearch  = () => {
  
  const {publicAxios} = useContext(AxiosContext);

  const [ searchterm , setSearchterm] = useState('')
  const [ clicked, setClicked] = useState()
  const [ showFilter, setShowFilter] =useState(false)
  const [ loading, setLoading] = useState()

  const [Data, setData] = useState(data.resourceType)

  const handleCheckbox = (item) => {
    const index = Data.findIndex(x => x == item);
    const datasClone = [...Data];
    datasClone[index].state = !datasClone[index].state;
    setData(datasClone);
    }

  const resources = useRef([])
  const [searchResult, setSearchResult] = useState([])
  

  const handleSearch = async() => {
    try{
       Keyboard.dismiss()
      setLoading(true)
      // await publicAxios.get(`/api/search-googlescholar/?searchterm=${searchterm}`)
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
        await Axios.get(`https://serpapi.com/search.json?engine=google_scholar&q=${searchterm}&api_key=3d8ded321f6009b48d30e82f287a0b2f23389ac006db4744f67df42aa45548fc
        `).then((response)=>
        {
       
        // console.log(response.data)
        resources.current = response.data.organic_results
        console.log(resources.current)
        setSearchResult(resources.current)
        // console.log(searchResult)
        }
        )
        .catch((err)=>console.log(err))
        .finally(() => {
          setLoading(false);
        });
      }

    }
    catch(err){
      if (axios.isAxiosError(err)) {
        console.error("Axios request failed", err.response?.data, err.toJSON());
  } else {
    console.error(err);
  }

    }
  }

  return (

    <View className={showFilter? 'bg-lightmain w-screen h-full': ' w-screen '}>

    <View className= 'w-[96%] flex flex-row my-4 py-2 mx-auto'>
    {clicked && (
      <View className='p-2'>
        <TouchableOpacity
          onPress={() => {
            setSearchterm("")
            Keyboard.dismiss();
            setClicked(false);
            setSearchResult('')
            setLoading(false)

          }}
        >
          <Text className="text-pink text-[16px] font-ageobold">Cancel</Text>
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
        className="font-ageonormal text-black w-[90%] text-[16px] px-2"
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
          color="#297373"
          style={{ marginLeft: 1 }}
        />
      </TouchableOpacity>
    
   

    </View>
    {/* cancel button, depending on whether the search bar is clicked or not */}
   
  </View>

 
  </View>
   
{/* search and filter */}

{loading? <Loader/>: 

// overlay


    <View className=' w-screen'>
      <View className='flex flex-row w-[96%] mx-auto'>

      <Text  className="font-ageobold p-2  text-[16px] text-grey-800">Search Result</Text>
      </View>

          {/* resource list */}

      <View className='w-[98%] mx-auto pt-2' >
    
        <FlatList
                data={searchResult}
                renderItem = {({item})=>
                  <Resource res={item} />    
                }
                keyExtractor={item => item.result_id}
                // contentContainerStyle={{
                //   flexGrow: 1,
                //   }}
              
                // refreshControl={
                //   <RefreshControl  size={'large'} colors={['gray']} />
                // }
                />
          
       </View> 

 </View>
}
  </View>
  )

}


export default GoogleScholarSearch



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
    color:'gray',
    fontFamily: 'AgeoPersonalUse',
    fontSize: 18
  },
  dropdownContainer: {
    borderRadius: 5,
    height: 50,
    borderWidth: 1,
    padding: 16,
    marginVertical: 4,
    borderColor: 'grey',
    marginBottom: 16,
    fontFamily: 'AgeoPersonalUse',
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
});