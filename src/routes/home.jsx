import React, { useState,useEffect } from 'react';
import { View, Text, TextInput,StyleSheet,TouchableOpacity,ScrollView,Dimensions,Image} from 'react-native';
 import { useDispatch,useSelector } from 'react-redux';
 import { addUser } from '../store/slices/userSlice';
 import EncryptedStorage from 'react-native-encrypted-storage';
 import { SearchBar } from '@rneui/themed';
 import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar, Tab} from 'react-native-elements';
import JobComponentSmall from '../components/jobComponentSmall';
import TabNavigatorHome from '../components/tabNavigatorHome';
import JobComponentLarge from '../components/JobComponentLarge';
import Categories from '../components/categories';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = ({navigation},async) => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const data=  useSelector(state=>{
      return state.user.userData;
    })
    function searchF(){
      console.log("searching "+search);
    }
    
    return (
    <ScrollView style={{flex:1}} contentContainerStyle={{}}>
     
     <View style={{alignItems:'center',width:windowWidth,height:0.95*windowHeight}}>
      <View style={{flex:1,width:'95%', flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
        <Text style={{fontSize:20}}>Welcome {data.name}</Text>
        <TouchableOpacity onPress={()=>{navigation.navigate("Profile")}}>
        <Avatar rounded size={'medium'} source={{ uri: 'https://i.pinimg.com/736x/c8/ff/88/c8ff88ba5d7c2844bfbeaaa0837d1de5.jpg' }}/>
        </TouchableOpacity>
      </View>
      <View style={{flex:4,width:'95%'}}>
      <View style={{flexDirection:'row',  borderWidth:2,borderRadius:10,marginVertical:10}}>
        <TextInput 
          style={{flex:5,fontSize:20,padding:15}}
          placeholder='Search...'
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={{alignItems:'center',justifyContent:'center',flex:1,borderRadius:10}}>
          <Icon name="search"  style={{fontSize:25,alignSelf:'center'}}/>
        </TouchableOpacity>
      </View>
      <View style={{flex:1,backgroundColor:"#005B6C",paddingVertical:20,paddingHorizontal:10, borderRadius:10}}>
        <Text style={{marginHorizontal:0,fontSize:20,paddingVertical:10, fontWeight:'bold',color:'white'}}>Categories</Text>
        <ScrollView horizontal pagingEnabled snapToAlignment='center' showsHorizontalScrollIndicator={true}>
        <Categories/>
        </ScrollView>
      </View>
      </View>
      <View style={{flex:6,backgroundColor:'red',width:'95%',margin:10,borderRadius:10}}>
        <TabNavigatorHome style={{flex:1}}/>
      </View>
     </View>
    <JobComponentLarge/>
    </ScrollView>
    );
  };
  const styles = StyleSheet.create({
    container: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    },
    title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    },
    input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius:5,
    }
  });
  export default HomeScreen;