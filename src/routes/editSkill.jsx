import { StyleSheet, Text, View,ActivityIndicator, TouchableOpacity,Button, Alert } from 'react-native'
import React,{useEffect,useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import address from '../../address'
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch,useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { onBackPress } from '../components/backPressHandler';
import { addUser } from '../store/slices/userSlice';
let globalCategories=[];
let selectedCategory='';


const MySkills=({navigation})=>{
  const [userData2,setUserData2]=useState({});
  const [usedSkills,setUsedSkills]=useState();
  const [submit,setSubmit]=useState(false);
  const dispatch = useDispatch();
  data= useSelector(state=>{
    return state.user.userData;
  })
  
    async function getdata()
    {
     
      setUserData2(data);
      setUsedSkills(data.skills);
    } 
    function categorySkillsDisplay(){
      let data= usedSkills?usedSkills.find(skill=>skill.name===selectedCategory):null;
      let returns=data?data.skills.map(skill=>{
          return(<View style={{flexDirection:'row',flexGrow:1,height:60,fontSize:20,width:"30%",margin:5,borderWidth:1,borderRadius:5,backgroundColor:'#009cb8',alignItems:'center',justifyContent:"space-between"}} key={skill}>
            <Text style={{flex:3,marginHorizontal:5,fontWeight:'bold',color:'white'}}>{skill}</Text>
            <TouchableOpacity style={{flex:1,alignItems:'flex-end'}} onPress={()=>{removeSkill(skill)}}>
            <Icon name="close-circle-outline" style={{fontSize:40}} />
            </TouchableOpacity>
          </View>)
      }):<></>
      return returns;
      
    }
    function unusedSkillsDisplay(){
      let returns;
      let data2= usedSkills?usedSkills.find(skill=>skill.name===selectedCategory):null;
        let data3= globalCategories?globalCategories.find(skill2=>skill2.name===selectedCategory):null;
        
       if(data3){
          let filteredSkills=data2?data3.skills.filter(item=>!data2.skills.includes(item)):data3.skills;
          console.log("filtered skills"+filteredSkills);
          returns=filteredSkills?filteredSkills.map(skill=>{
            return(<View style={{flexDirection:'row',flexGrow:1,height:60,fontSize:20,width:"30%",margin:5,borderWidth:1,borderRadius:5,backgroundColor:'tomato',alignItems:'center',justifyContent:"space-between",borderBottomWidth:2}} key={skill}>
            <Text style={{flex:3,marginHorizontal:5,fontWeight:'bold',color:'white'}}>{skill}</Text>
            <TouchableOpacity style={{flex:1,alignItems:'flex-end'}} onPress={()=>{addSkill(skill)}}>
            <Icon name="add-circle-outline" style={{fontSize:40}} />
            </TouchableOpacity>
          </View>)
          }):<></>
         
        }
        else{
          returns=<></>
        }
        return returns; 
      }
    async function removeSkill(name){
        let temp=[...usedSkills];
        let findCategorySkills=usedSkills?usedSkills.find(skill=>skill.name==selectedCategory):null;
        if(!findCategorySkills){
          setUsedSkills([...usedSkills,{"name":selectedCategory,"skills":[]}]);
          findCategorySkills=usedSkills.find(skill=>skill.name==selectedCategory);
        }
        let skills=findCategorySkills.skills;
        skills=skills.filter(skill=>skill!==name);
       const newData=temp.map(skill=>{
          if(skill.name==selectedCategory){
            return ({name:skill.name,skills:skills})
          }
          return skill;
        })
        setUsedSkills(newData);

    }
    async function addSkill(name){
      let temp=[...usedSkills];
      let findCategorySkills=usedSkills?usedSkills.find(skill=>skill.name==selectedCategory):null;
      console.log(findCategorySkills)
        if(!findCategorySkills){
           temp=[...usedSkills,{"name":selectedCategory,"skills":[]}]
          findCategorySkills=await temp.find(skill=>skill.name==selectedCategory);
        }
        let skills=findCategorySkills?findCategorySkills.skills:[];
        skills=skills.filter(skill=>skill!==name);
        skills=[...skills,name];
        const newData=temp.map(skill=>{
          if(skill.name==selectedCategory){
            return ({name:skill.name,skills:skills})
          }
          return skill;
        })
        setUsedSkills(newData);
    }
    
    async function handleSubmit(){
      let request=await fetch('http://'+address+':3000/candidates/'+userData2._id, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
       body: JSON.stringify({"skills":usedSkills}),
      }).then((response) => response.json()).then(data=>{
        if (data.message=="Success"){
          dispatch(addUser(data.user));
        }else{     
          Alert("Failed")
        }
        getdata();
        setSubmit(false);
      })
    }

    //function to stop user form going back when request is called.... only works on android emulator .... DOESNOT SEEM TO WORK ON WSA
    function handleBackPress(){ 
      if(!submit){
        console.log("going back")
        navigation.goBack();
        return true;
      }else{
        console.log("doing work")
      }
    }
    useEffect(()=>{
      onBackPress(handleBackPress);
      getdata();

  },[])
  return(
    userData2 && data ? (
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={{flex:1}}
      >
        
            <View style={{flex:5}}>
              <Text style={{fontSize:20}}> Your Skills:</Text>
              <ScrollView style={{flex:1}} contentContainerStyle={{flexDirection:'row',flexWrap:'wrap',justifyContent:'flex-start'}} >
                  {
                   categorySkillsDisplay()
                  }
              </ScrollView>
            </View>
            <View style={{flex:5}}>
              <Text style={{fontSize:20}}> Add Skills:</Text>
              <ScrollView style={{flex:1}} contentContainerStyle={{flexDirection:'row',flexWrap:'wrap',justifyContent:'flex-start'}}>
                  {
                    unusedSkillsDisplay()
                  }
              </ScrollView>
            </View>
            <View style={{flex:1}}>
                  <TouchableOpacity  onPress={()=>{  setSubmit(true); handleSubmit();}} style={{flex:1,margin:10,alignItems:'center',justifyContent:'center',backgroundColor:'#009CB8',borderRadius:10}} ><Text style={{fontSize:30}}>Submit</Text></TouchableOpacity>
            </View>
            {submit?<View style={{elevation:3, position:'absolute' , width:'100%',height:'100%',backgroundColor:'rgba(141, 141, 141,0.5)',alignItems:'center',justifyContent:'center'}}>
          <ActivityIndicator size={100} color={'white'} />
        </View>:<></>}
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
            colors={['#009CB8','#009CB8','#3795e0']}
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