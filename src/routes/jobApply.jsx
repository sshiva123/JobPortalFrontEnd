import { useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { Alert, TextInput, TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View,ScrollView } from 'react-native'
import { useSelector,useDispatch } from 'react-redux';
import address from '../../address';
import { appliedJobs } from '../store/slices/userSlice';
import { Input } from '@rneui/themed';

const JobApply = ({navigation}) => {
  const userData=useSelector((state)=>{
    return state.user.userData;
  })
  const dispatch=useDispatch()
   const route=useRoute()
   const job=route.params.job;
   const [additionalDetails,setAdditionalDetails]=useState('');
  
   const applyJob=async()=>{
        await fetch('http://'+address+':3000/jobs/jobApply/'+job._id,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            applicant_id:userData._id,
            description:additionalDetails
          })
        }).then(response=>response.json()).then(data=>{
          if(data.message=="Success"){
            dispatch(appliedJobs(job._id));
            Alert.alert("Successfully applied");
            navigation.pop();
          }else{
            Alert.alert(data.message);
          }
        });
        
   } 
  return (
    <View style={{alignItems:'center',margin:10,flex:1}}>
        <Text style={{fontSize:22 }}>You are now applying for:</Text>
        <Text style={{fontSize:22,fontWeight:'bold' }}>{job.title}</Text>
        <Text>Enter additional details(Optional):</Text>
        <View style={{flex:5,borderWidth:1,alignItems:'flex-start',width:'100%',marginVertical:40,borderRadius:20}}>

            {//<TextInput multiline={true} style={{backgroundColor:'red',width:'100%'}} value={additionalDetails} onChangeText={value=>{ setAdditionalDetails(value) }} />
            }
            
            <TextInput multiline={true} style={{ width: '100%', height: '100%' ,textAlignVertical:'center'}} placeholder="Type here..." value={additionalDetails} onChangeText={value=>{ setAdditionalDetails(value) }}/>

        
        </View>
        <View style={{width:'100%',alignSelf:'flex-end'}}>
        {
            userData.appliedJobs.indexOf(job._id)>-1?
            <View style={{width:'100%',height:100,alignItems:'center',justifyContent:'center',backgroundColor:'#grey',borderRadius:10}}>
            <Text style={{fontSize:25,fontWeight:'bold',color:'#f2f2f2'}}>Submit</Text>
          </View>:
            <TouchableOpacity style={{width:'100%',height:100,alignItems:'center',justifyContent:'center',backgroundColor:'#2089dc',borderRadius:10}} onPress={ applyJob }>
            <Text style={{fontSize:25,fontWeight:'bold',color:'#f2f2f2'}}>Submit</Text>
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}

export default JobApply

const styles = StyleSheet.create({})