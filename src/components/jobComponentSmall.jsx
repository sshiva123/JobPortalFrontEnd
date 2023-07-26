import { StyleSheet,Dimensions, Text, View,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { categoriesData } from './categories';
import { Avatar } from '@rneui/base';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const JobComponentSmall = ({navigation,job}) => {
const getImageSource=()=>{
 
    let category=categoriesData.find(cat=>cat.name==job.category);
    if(category){
      return category.image;
    }
    else{

    }
  
}
  return (
    <TouchableOpacity onPress={()=>{
      navigation.navigate('Jobs',{screen:"JobDisplay",params:{job:job}}) 
    }} style={styles.mainView}>
      <View style={styles.topView} > 
      <Image style={{width:'100%',height:'85%'}} source={getImageSource()} />
      <View style={{position:'absolute',bottom:0,alignSelf:'center'}}>
      <Avatar rounded size={80} source={{uri:job.companyData.displayPicture}} avatarStyle={{borderWidth:4 ,borderColor:'white' }}/>
      </View>
      </View>
      <View style={styles.bottomView}>
        <Text>{job.title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    mainView:{
        alignSelf:'center',
        margin:10,
        width:'40%',
        height:140,
        borderRadius:5,
        borderColor:'gray',
        backgroundColor:'#f2f2f2',
        overflow:'hidden'
    },
    topView:{
        flex:3,
      
    },
    bottomView:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default JobComponentSmall;