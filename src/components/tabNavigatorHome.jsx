import React, { useState,useEffect  } from 'react';
import { StyleSheet,ScrollView, View,Dimensions,Text ,Image,ActivityIndicator} from 'react-native';
import { useSelector } from 'react-redux';
import { TabView, SceneMap } from 'react-native-tab-view';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import address from '../../address';
import JobComponentSmall from './jobComponentSmall';

const Recommended = ({navigation}) => {
  const [jobs,setJobs]=useState(null);
  const userData=  useSelector(state=>{
    return state.user.userData;
  })
  async function getData(){
    const data=await fetch("http://"+address+':3000/jobs/recommended/'+userData._id);
    const data2=await data.json();
    setJobs(data2.jobs);
  }
  useEffect(() => {
   getData();
    
  }, [])
  
  return(
      jobs!==null?
      
      
      <View style={[styles.scene, { }]} >
        <ScrollView nestedScrollEnabled={true}>
       <View style={{flex:1,flexDirection:'row' ,flexWrap:'wrap',alignItems:'center',justifyContent:'center'}}>
       {
          jobs.map(job=>{
           return (<JobComponentSmall key={job._id} job={job}/>)
          })
      }
      </View>
     </ScrollView>
    </View>
   :<ActivityIndicator style={{flex:1}}/>

  )};

const Categories = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} ><Image style={{flex:1}} source={{uri:'https://i0.wp.com/www.sharonkgilbert.com/wp-content/uploads/2015/12/Under-construction-1.png'}} /></View>
);

const Popular = ({navigation}) => {
  const [jobs,setJobs]=useState(null);

  async function getData(){
    const data=await fetch("http://"+address+':3000/jobs/popular');
    const data2=await data.json();
    setJobs(data2.jobs);
  }
  useEffect(() => {
   getData();
    
  }, [])
  
  return(
      jobs!==null?
      
      
      <View style={[styles.scene, { }]} >
        <ScrollView nestedScrollEnabled={true}>
       <View style={{flex:1,flexDirection:'row' ,flexWrap:'wrap',alignItems:'center',justifyContent:'center'}}>
       {
          jobs.map(job=>{
           return (<JobComponentSmall navigation={navigation} key={job._id} job={job}/>)
          })
      }
      </View>
     </ScrollView>
    </View>
   :<ActivityIndicator style={{flex:1}}/>

  )
  
};

const RecentlyAdded = ({navigation}) => {  
  const [jobs,setJobs]=useState(null);
  async function getData(){
    const data=await fetch("http://"+address+':3000/jobs/recent');
    const data2=await data.json();
    setJobs(data2.jobs);
  }
  useEffect(() => {
   getData();
    
  }, [])
  
  return(
      jobs!==null?
      
      
      <View style={[styles.scene, { }]} >
        <ScrollView nestedScrollEnabled={true}>
       <View style={{flex:1,flexDirection:'row' ,flexWrap:'wrap',alignItems:'center',justifyContent:'center'}}>
       {
          jobs.map(job=>{
           return (<JobComponentSmall navigation={navigation} key={job._id} job={job}/>)
          })
      }
      </View>
     </ScrollView>
    </View>
   :<ActivityIndicator style={{flex:1}}/>

  )
  
}
const Tab=createMaterialTopTabNavigator()

const TabNavigatorHome = ({navigation}) => {


  return (
    <Tab.Navigator screenOptions={{tabBarStyle: { backgroundColor: '#2089dc',borderTopEndRadius :20,borderTopStartRadius:20}}} style={{borderBottomEndRadius:20,borderBottomStartRadius:20}}>
      { // <Tab.Screen name="Recommended" component={Recommended} />
}
        <Tab.Screen name="Popular" component={Popular} />
        <Tab.Screen name="Recent" component={RecentlyAdded} />
    </Tab.Navigator>
   
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor:'#051336'

  },
});

export default TabNavigatorHome;