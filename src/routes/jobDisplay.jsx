import { StyleSheet, Text, View,Image,Button,TouchableOpacity ,ScrollView} from 'react-native'
import React, { useState,useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { categoriesData } from '../components/categories';
import FastImage from 'react-native-fast-image';
import { Avatar, ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { onBackPress } from '../components/backPressHandler';


const JobDisplay = ({navigation}) => {
   
    const route=useRoute();
    const job=route.params.job;
    const [selectedIndex,setSelectedIndex]=useState(0);
    const category=categoriesData.find(cat=>cat.name==job.category);
    console.log(category);
    function handleBackPress(){
      console.log('back pressed')
      //navigation.navigate('Home')
    }
    useEffect(() => {
      
    //onBackPress(handleBackPress);
      
    }, [])
    
  return (
    <View style={styles.main}>
      <View style={styles.top}>
        <Image source={category.image} style={{width:'100%',height:'90%',borderRadius:20}} />
        <View style={{alignSelf:'center',position:'absolute',bottom:0}}>
          <Avatar rounded avatarStyle={{ borderWidth:5,borderColor:'#f2f2f2' }} size={110} source={{uri:'https://reactnative.dev/img/tiny_logo.png'}}/>
        </View>
        <TouchableOpacity style={{alignSelf:'center',backgroundColor:'#f2f2f2',borderRadius:10,position:'absolute',top:0,right:0}}>
          <Icon name="bookmark-outline" size={50}/>
          <Text style={{textAlign:'center'}}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mid}>  
        <Text style={{fontSize: 25,fontWeight:'bold',color:'black'}}>{job.title}</Text>
        <Text>({job.designation})</Text>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Icon name='location' />
          <Text>  {job.location.country}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
        <Text  style={{backgroundColor:'#fce1aa',fontWeight:'bold',color:'#232323',padding:8,margin:2,borderRadius:15}}>• {job.type}</Text>
          {job.benefits.map(data=>{
            return (<Text key={data} style={{backgroundColor:'#808080',color:'#f2f2f2',padding:8,margin:2,borderRadius:15}}>• {data}</Text>)
          })}
        </View>

        <ButtonGroup
      buttonStyle={{ }}
      buttonContainerStyle={{}}
      buttons={[
        'Description',
        'Requirements'
      ]}
      containerStyle={{width:300,borderRadius:10}}
      disabledStyle={{}}
      disabledTextStyle={{}}
      disabledSelectedStyle={{}}
      disabledSelectedTextStyle={{}}
      innerBorderStyle={{}}
      onPress={selectedIdx =>
        setSelectedIndex(selectedIdx)
      }
      selectedButtonStyle={{}}
      selectedIndex={selectedIndex}
      selectedTextStyle={{}}
      textStyle={{}}
    />
    <View style={{width:'100%',flex:1}}>
      <ScrollView contentContainerStyle={{width:'100%',padding:10,flex:1,flexGrow:1,borderWidth:1,borderRadius:10,marginVertical:10,backgroundColor:'white'}}>
        <Text style={{color:'black',fontSize:17,textAlign:'justify'}}>
        {selectedIndex==0?job.description:job.skills.map(skill=>{
          let text=skill.name+':\n';
          for(skil of skill.skills){
            text+="     --"+skil+'\n';
          }
          return text

        })}
        </Text>
      </ScrollView>
      </View>
      </View>
      <View style={styles.bottom}>
        <Text style={{fontWeight:'bold',color:'#232323',fontSize:20,textAlign:'center',textAlignVertical:'center',borderRadius:10,marginRight:5, padding:10,backgroundColor:'#fce1aa'}}>{job.salary.currency} {job.salary.value}/mo</Text>
        <TouchableOpacity style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#2089dc',borderRadius:10}} >
          <Text style={{fontSize:25,fontWeight:'bold',color:'#f2f2f2'}}>Apply Now</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

export default JobDisplay;

const styles = StyleSheet.create({
  main:{
    flex:5,
    margin:5,
    overflow:'hidden',
    
  },
  top:{
    flex:4,
    overflow:'hidden',
    
  },
  mid:{
    flex:10,
    alignItems:'center',
  
  },
  bottom:{
    flex:1,
    flexDirection:'row'
  }


})