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

const Search = () => {
  
  const {authAxios} = useContext(AxiosContext);

  const [ searchterm , setSearchterm] = useState('')
  const [ clicked, setClicked] = useState()
  const [ showFilter, setShowFilter] =useState(false)
  const [ loading, setLoading] = useState()
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

  const resources = useRef([])
  const [searchResult, setSearchResult] = useState()
    // filter
    const type = useRef('')
    const department = useRef('')
    const level = useRef('')
  
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
  
  useEffect(()=>{
    if(type.current!=null || department.current!=null || level.current!=null ){
      const filteredresources =  resources.current.filter((item)=>
      {
       console.log(department.current)
       return item.type == type.current || item.department == type.department || item.level == type.level
      }
      )
      console.log(filteredresources)
      setSearchResult(filteredresources)
    }
    setSearchResult(resources.current)
  },[type.current,department.current])


  const handleSearch = async() => {
    try{
      setLoading(true)
      authAxios.get(`/api/search/?searchterm=${searchterm}`)
      .then((response)=>
      {
     
      console.log(response.data)
      resources.current = response.data
      setSearchResult(resources.current)
      console.log(searchResult)
      }
      )
      .catch((err)=>console.log(err))
      .finally(() => {
        setLoading(false);
      });
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

    <View className={showFilter? 'bg-lightgreen w-screen h-full': ' w-screen '}>
      
    <View className= 'w-[96%] flex flex-row my-4 py-2 mx-auto'>
    {clicked && (
      <View className='p-2'>
        <TouchableOpacity
          onPress={() => {
            setSearchterm("")
            Keyboard.dismiss();
            setClicked(false);
          }}
        >
          <Text className="text-pink text-xl font-ageobold">Cancel</Text>
        </TouchableOpacity>
      </View>
    )}

    <View className={clicked? " border border-green rounded-full text-[20px] pl-4 pr-2  w-[80%] mx-auto text-black" : "border border-green rounded-full text-[20px] pl-4 pr-2  w-[100%] text-black" }>
      
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
          color="#297373"
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

{loading? <ActivityIndicator size="large" style={styles.indicator} color={'#FF8552'} />: 

// overlay


    <View className=' w-screen'>
      <View className='flex flex-row w-[96%] mx-auto'>


      <TouchableOpacity onPress={showFilterBar} className='bg-green rounded-full text-center p-1'>
                  <View className='flex flex-row  z-10 ' >
                  <Icon
                  name="filter-variant"
                  size={30}
                  color="grey"
                  style={{ marginLeft: 1 }}
                />
                <Text  className="font-ageobold p-2 text-xl text-gray ">Filter Result</Text>
                    </View>
        </TouchableOpacity>

      <Text  className={showFilter? "hidden" : "font-ageobold p-2 px-8 text-xl text-grey-800"}>Search Result</Text>
      </View>
      {showFilter? <View className='bg-lightgreen w-screen h-full'>
      </View> : ''}
{/* filter area  */}


<View  className='absolute top-10'>


    
{showFilter? <View className='p-2 w-full'> 
       <View>
        <Text className='font-ageomedium p-2 text-xl text-grey-800'>Department</Text>
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
    <View>
      <Text className='font-ageomedium p-2 text-xl text-grey-800'>Level</Text>
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

       {/* type */}
       <View>
        <Text className='font-ageomedium p-2 text-xl text-grey-800'>Type</Text>
      {
      // setData(Data.map(item=> 
      //   {
      //     item.state =false;
      //     return item;}))
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
        
        )} 
     
       </View>
      </View>
      : 
      ''
}
</View>
         
          {/* resource list */}

      <View className='w-[98%] mx-auto pt-8 ' >
    
        <FlatList
                data={searchResult}
                renderItem = {({item})=>
                  <Resource name={item.name} link={item.link} resourceId={item._id}/>    
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

 </View>
}
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