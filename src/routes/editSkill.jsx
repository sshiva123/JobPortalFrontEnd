import { StyleSheet, Text, View,ActivityIndicator, TouchableOpacity } from 'react-native'
import React,{useEffect,useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import address from '../../address'
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch,useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
let globalCategories=[];
let selectedCategory='';


const MySkills=({navigation})=>{
  const [userData2,setUserData2]=useState({});
  const [usedSkills,setUsedSkills]=useState([]);
  const data= useSelector(state=>{
    return state.user.userData;
  })
    async function getdata()
    {
      console.log("Global= "+globalCategories)
      setUserData2(data);
      setUsedSkills(data.skills);
    } 
    function categorySkillsDisplay(){
      let data= usedSkills?usedSkills.find(skill=>skill.name===selectedCategory):null;
      let returns=data?data.skills.map(skill=>{
          return(<View style={{flexDirection:'row',flexGrow:1,height:60,fontSize:20,width:"30%",margin:5,borderWidth:1,borderRadius:5,backgroundColor:'white',alignItems:'center',justifyContent:"space-between"}} key={skill}>
            <Text style={{flex:3,marginHorizontal:5}}>{skill}</Text>
            <TouchableOpacity style={{flex:1,alignItems:'flex-end'}}>
            <Icon name="close-outline" style={{fontSize:40}} />
            </TouchableOpacity>
          </View>)
      }):<></>
      return returns;
      
    }
    function unusedSkillsDisplay(){
      let returns;
      let data2= usedSkills?usedSkills.find(skill=>skill.name===selectedCategory):null;
        let data3= globalCategories?globalCategories.find(skill2=>skill2.name===selectedCategory):null;
        console.log("data2=")
        console.log(data2);
       if(data2 && data3){
          let filteredSkills=data3.skills.filter(item=>!data2.skills.includes(item));
          console.log(filteredSkills);
          returns=filteredSkills?filteredSkills.map(skill=>{
            return(<View style={{flexDirection:'row',flexGrow:1,height:60,fontSize:20,width:"30%",margin:5,borderWidth:1,borderRadius:5,backgroundColor:'white',alignItems:'center',justifyContent:"space-between"}} key={skill}>
            <Text style={{flex:3,marginHorizontal:5}}>{skill}</Text>
            <TouchableOpacity style={{flex:1,alignItems:'flex-end'}}>
            <Icon name="close-outline" style={{fontSize:40}} />
            </TouchableOpacity>
          </View>)
          }):<></>
         
        }
        else{
          returns=<></>
        }
        return returns; 
    }
    useEffect(()=>{
    getdata();
  },[])
  return(
    userData2 && data ? (
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={{flex:1}}
      >
            <View style={{flex:1}}>
              <Text style={{fontSize:20}}> Your Skills:</Text>
              <ScrollView style={{flex:1}} contentContainerStyle={{flexDirection:'row',flexWrap:'wrap',justifyContent:'flex-start'}} >
                  {
                   categorySkillsDisplay()
                  }
              </ScrollView>
            </View>
            <View style={{flex:1}}>
              <Text style={{fontSize:20}}> Add Skills:</Text>
              <ScrollView style={{flex:1}} contentContainerStyle={{flexDirection:'row',flexWrap:'wrap',justifyContent:'flex-start'}}>
                  {
                    unusedSkillsDisplay()
                  }
              </ScrollView>
            </View>
        </LinearGradient>
    ) : (
      <View>{console.log("nodata found")}
        <ActivityIndicator/>
      </View>
    )
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
            <TouchableOpacity  onPress={()=>{selectedCategory=cdata.name;navigation.navigate("mySkills")}}  style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
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
    <Stack.Screen name='mySkills' component={MySkills} options={{headerShown:false}}/>
  </Stack.Navigator>
  )
}

export default EditSkill

const styles = StyleSheet.create({})