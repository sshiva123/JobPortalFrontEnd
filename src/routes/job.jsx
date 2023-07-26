import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect,useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import JobDisplay from './jobDisplay';
import JobApply from './jobApply';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';
import address from '../../address';
import { ScrollView } from 'react-native-gesture-handler';
import JobComponentLarge from '../components/JobComponentLarge';
const SavedJobs=({navigation})=>{
  const [jobs,setJobs]=useState();
  const [loading,setLoading]=useState(true);
  const userData=useSelector((state)=>{
    return state.user.userData;
  })
  async function getJobs(){
    const savedJob=await fetch('http://'+address+':3000/jobs/savedJobs/'+userData._id)
    const data=await savedJob.json();
    setJobs(await data);
    console.log(jobs)
    setLoading(false)
  }
  useEffect(()=>{
    getJobs()
  },[])
  useEffect(()=>{
    getJobs()
  },[userData])
  return(
   loading?<View style={{alignItems:'center',justifyContent:'center'}}><ActivityIndicator size={'large'} /></View>:
   (!jobs.jobs[0] && jobs.message!=='Success' ?<View style={{alignItems:'center',justifyContent:'center'}}><Text>No Saved Jobs</Text></View>:
   <ScrollView>{jobs.jobs.map(data=>{
    return(<JobComponentLarge key={data._id} navigation={navigation} jobData={data}/>)
   })}</ScrollView>)
  )
}
const AppliedJobs=({navigation})=>{
  const [jobs,setJobs]=useState();
  const [loading,setLoading]=useState(true);
  const userData=useSelector((state)=>{
    return state.user.userData;
  })
  async function getJobs(){
    const appliedJob=await fetch('http://'+address+':3000/jobs/appliedJobs/'+userData._id)
    const data=await appliedJob.json();
    setJobs(await data);
    console.log(jobs)
    setLoading(false)
  }
  useEffect(()=>{
    getJobs()
  },[])
  useEffect(()=>{
    getJobs()
  },[userData])
  return(
   loading?<View style={{alignItems:'center',justifyContent:'center'}}><ActivityIndicator size={'large'} /></View>:
   (!jobs.jobs[0] && jobs.message!=='Success' ?<View style={{alignItems:'center',justifyContent:'center'}}><Text>No Applied Jobs</Text></View>:
   <ScrollView>{jobs.jobs.map(data=>{
    return(<JobComponentLarge key={data._id} navigation={navigation} jobData={data}/>)
   })}</ScrollView>)
  )
}


const JobScreen = ({navigation}) => {
 const Tab=createMaterialTopTabNavigator()
  return (
    <Tab.Navigator>
        <Tab.Screen name="Saved" component={SavedJobs} />
        <Tab.Screen name="Applied" component={AppliedJobs} />
        <Tab.Screen name="Accepted" component={SavedJobs} />
    </Tab.Navigator>
  )
}


const Job = ({navigation}) => {
    const Stack=createStackNavigator();
  return (
    <Stack.Navigator >
        <Stack.Screen name="JobScreen" component={JobScreen} options={{headerShown:false}}/>
        <Stack.Screen name="JobDisplay" component={JobDisplay}  options={{title:'Job', headerShown:true}} />
        <Stack.Screen name="JobApply" component={JobApply}  options={{title:'Job', headerShown:true}} />
    </Stack.Navigator>
    
  )
}

export default Job

const styles = StyleSheet.create({})