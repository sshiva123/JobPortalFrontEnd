import { StyleSheet, Text, View,ActivityIndicator, TouchableOpacity } from 'react-native'
import React,{useEffect,useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import address from '../../address'
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch,useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
let globalCategories=[];
const mySkills=({navigation})=>{
  
  return(
    <LinearGradient
    colors={['#4c669f', '#3b5998', '#192f6a']}
    style={{flex:1}}
  >
        <View style={{flex:1}}>
          <ScrollView style={{flex:1, flexGrow:3 }}>
            
          </ScrollView>
        </View>
        <View style={{flex:1}}>
            <ScrollView style={{flex:1}}>

            </ScrollView>
        </View>
    </LinearGradient>
  );
}


const ListCategories=({navigation})=>{
 const [categories,setCategories]=useState([])
 async function getCategories(){
 let result= await fetch('http://'+address+':3000/categories');
let data= await result.json();
    console.log(data)
 
  setCategories(data.categories);
  globalCategories=data.categories;
 }
  useEffect(()=>{
   getCategories();
  },[]);
  return(<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
    {!categories[0]?<ActivityIndicator size="large" color="#0000ff" />:
      <LinearGradient 
      colors={['#4c669f', '#3b5998', '#192f6a']}
      
     style={{width:'100%',alignContent:'center',justifyContent:'center'}}>
        <ScrollView >
          {categories.map(cdata=>{
            return(
            <LinearGradient key={cdata.name} 
            //colors={['tomato', 'tomato','tomato', '#ffbe00']} 
            colors={['brown','brown',  'tomato']}
              start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }} style={{height:60,width:'95%',borderRadius:20,margin:10,borderWidth:2}}>
            <TouchableOpacity  onPress={()=>{console.log(cdata.name+ " pressed")}}  style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Text style={{fontSize:20   ,marginHorizontal:10,color:'white'}}>{cdata.name}</Text>
            <Icon name='chevron-forward-outline' style={{ marginHorizontal:10,fontSize:30,color:'white' }} />
            </TouchableOpacity>
            </LinearGradient>)
          })}
        </ScrollView>
      </LinearGradient>
    
  }</View>
  );
}
const EditSkill = ({naviagtion}) => {
    const Stack=createStackNavigator();
  return (
  <Stack.Navigator>
    <Stack.Screen name='listCategories' component={ListCategories} options={{ headerShown:false }} />
  </Stack.Navigator>
  )
}

export default EditSkill

const styles = StyleSheet.create({})