import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MessageProfileLarge = ({navigation,userData,conversation,lastMessage}) => {
   
    return (
    
    <TouchableOpacity onPress={()=>{navigation.navigate("Message",{name:userData.name,conversation:conversation})}} style={styles.main}>
        <View style={styles.avatar}>
            <Avatar  avatarStyle={{ borderWidth: 1, borderColor: 'green' }} rounded size={'large'} source={{uri: 'https://i.pinimg.com/736x/c8/ff/88/c8ff88ba5d7c2844bfbeaaa0837d1de5.jpg' }} />
        </View>
        <View style={styles.userDetail}>
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.company}>{userData.company}</Text>
            <Text numberOfLines={1} style={styles.message}>{lastMessage[0]?lastMessage[0].sender==userData._id?userData.name+': '+lastMessage[0].content:'You: '+lastMessage[0].content:""}</Text>
            </View> 
    </TouchableOpacity>
  )
}

export default MessageProfileLarge;

const styles = StyleSheet.create({
    main:{
        flexDirection:'row',
        marginHorizontal:10,
        marginVertical:10,
        borderWidth:0,
        borderColor:'gray',
        borderRadius:10,
        padding:5
    },
    avatar:{
  
        
    },
    userDetail:{
        flex:1,
        marginHorizontal:10,
        marginVertical:5,
       
    },
    name:{
        fontSize:20,
        fontWeight:'bold'
    },
    company:{
        fontSize:15
    },
    message:{
        fontSize:15,
        fontWeight:'bold'
    }
})