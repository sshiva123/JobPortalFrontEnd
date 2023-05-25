import { StyleSheet,Dimensions, Text, View,Image } from 'react-native'
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
    <View style={styles.mainView}>

      <View style={styles.topView} >
        
      <Image style={{width:'100%',height:'70%'}} source={getImageSource()} />
      <View style={{position:'absolute',bottom:0,alignSelf:'center'}}>
      <Avatar rounded size={80} source={{uri:job.companyData.displayPicture}} avatarStyle={{borderWidth:4 ,borderColor:'white' }}/>
      </View>
      </View>
      <View style={styles.bottomView}>
        <Text>{job.title}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView:{
        alignSelf:'center',
        margin:10,
        width:'45%',
        height:140,
        borderRadius:5,
        borderColor:'gray',
        backgroundColor:'white'
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