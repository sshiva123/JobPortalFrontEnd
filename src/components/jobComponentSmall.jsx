import { StyleSheet,Dimensions, Text, View,Image } from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const JobComponentSmall = (props,{navigation}) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.topView} >
      <Image style={{flex:1}} source={{uri:'https://i0.wp.com/www.sharonkgilbert.com/wp-content/uploads/2015/12/Under-construction-1.png'}} />
      </View>
      <View style={styles.bottomView}>
        <Text>This is bottom view</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView:{
        flex:1,
        marginRight:10,
        width:windowWidth/2,
        borderWidth:2,
        borderRadius:5,
        borderColor:'gray',
        backgroundColor:'white'
    },
    topView:{
        flex:3
    },
    bottomView:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default JobComponentSmall;