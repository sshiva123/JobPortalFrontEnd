import { StyleSheet, Text, View,ActivityIndicator,ScrollView,TextInput,TouchableOpacity } from 'react-native'
import React, { useContext,useState,useRef, useEffect } from 'react'
import TabNavigatorHome from '../components/tabNavigatorHome'
import { Provider,useDispatch ,useSelector} from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { SocketContext } from '../../SocketContext';
import address from '../../address';
import MessageProfileLarge from '../components/messageProfileLarge';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import { Avatar, Tab} from 'react-native-elements';
import { onBackPress } from '../components/backPressHandler';
const InboxScreen = (navigation) => {
  const dispatchRedux=useDispatch();
  const Stack=createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Conversation" component={ Conversation } />
      <Stack.Screen name="Message" component={Message} options= { ( { route }) => ( { title: route.params.name })}/>
    </Stack.Navigator>
   
  )
}

const Conversation = ({navigation}) => {
  const isFocused = useIsFocused();
  let socket = useContext(SocketContext);
  const data =  useSelector(state => {
    return state.user.userData;
  })
  const [conversation, setConversation] = useState([]);
  const [getting, setGetting] = useState(false);
  async function getConversations() {
    const empty = [];
    let temp;
    const convo = await fetch('http://' + address + ':3000/conversation/' + data._id).then(con => con.json()).then(async data2 => {
      for (const conv of data2) {
        const otherUserId = conv.members.find((member) => member !== data._id);
        const otherUserData = await fetch(`http://${address}:3000/detail/${otherUserId}`).then((res) => res.json());
        const lastMessage=await fetch('http://'+address+':3000/message/one/'+conv._id).then((res) => res.json());
        const temp = { conversation: conv, otherUser: otherUserData ,lastMessage:lastMessage };
        empty.push(temp);
      }
      setConversation(empty);
      setGetting(false);
    });
  }
 
  useEffect(() => {
    function handleSocket() {
      console.log("help");
      setGetting(true);
      getConversations();
    }
    socket.on('newMessage',handleSocket);
    return () => {
      socket.off('newMessage',handleSocket);
    };
  },[socket]);

  useEffect(() => {
    setConversation([]);
    setGetting(true);
    getConversations();
  }, [socket, isFocused]);
  if (getting === true) {
    return <ActivityIndicator />;
  }
  if (conversation[0]) {
    return (
      <View style={{ flex: 1 }}>
        {conversation.map(convos => {
          return (
            <MessageProfileLarge
              key={convos.conversation._id}
              navigation={navigation}
              userData={convos.otherUser.user}
              conversation={convos.conversation}
              lastMessage={convos.lastMessage}
            />
          );
        })}
        <TouchableOpacity
          onPress={() => {
            socket.emit("selfMessage");
          }}>
          <Text>INCOMING MESAGE TEST</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <Text style={{ flex: 1 }}>No messages</Text>
  );
};
const Message=({navigation})=>{
  const isFocused = useIsFocused();
  const scrollViewRef = useRef(null);
  const route=useRoute();
  const socket=useContext(SocketContext);
  const data=  useSelector(state=>{
    return state.user.userData;
  })
  const reveiver=route.params.conversation.members.find(member=>member!==data._id);
  const [messageText,setMessageText]=useState('');
  const [messages,setMessages]=useState([]);
  const [getting,setGetting]=useState(false)
  console.log(route.params.conversation._id)
  async function getMessages(){
    let message=await fetch('http://'+address+':3000/message/'+route.params.conversation._id).then(msg=>msg.json());
    console.log(message)
    setMessages(message);
  }
  useEffect(()=>{
    function handleSocket(data){
      setMessages(prevData=>[...prevData,data]);
    }
    socket.on('newMessage',handleSocket);
    return(()=>{
      socket.off('newMessage',handleSocket)
    })
  },[socket])
 
   function sendMessage(){
      messageText.trim()?socket.emit('sendMessage',({userId:data._id,receiverId:reveiver,text:messageText,conversation:route.params.conversation._id})):()=>{};
      setMessageText('');
      
      
  }
  function handleBackPress(){
    navigation.goBack();
  }
  useEffect(()=>{
    onBackPress(handleBackPress)
    setGetting(true);
    getMessages();
    scrollViewRef.current.scrollToEnd({ animated: false });
    
  },[])
  useEffect(()=>{
    scrollViewRef.current.scrollToEnd({ animated: true });
  },[isFocused])


let oldSender='';
  return(
    <View style={styles.main}>
      <View style={styles.scrollView}>
    <ScrollView ref={scrollViewRef} onContentSizeChange={() => {scrollViewRef.current?.scrollToEnd()}}>{
    messages.length?messages.map((message,index)=>{

      if(message.sender==data._id){
        return(
          <View key={message._id} style={{alignItems:'flex-end'}}>
          <Text style={{ maxWidth:'80%',backgroundColor:'blue',fontSize:20,color:'white',paddingHorizontal:10,paddingVertical:5,borderRadius:20,marginVertical:2}} >{message.content}</Text>
          {(!messages[index+1] || messages[index+1].sender!==message.sender)?
          <Avatar rounded size={18} source={{ uri: 'https://i.pinimg.com/736x/c8/ff/88/c8ff88ba5d7c2844bfbeaaa0837d1de5.jpg'}}/>
          :<></>}
          </View>)
      }
      return(
      <View key={message._id}>
      <Text style={{ maxWidth:'80%',alignSelf:'flex-start',backgroundColor:'gray',fontSize:20,color:'white',paddingHorizontal:10,paddingVertical:5,borderRadius:20,marginVertical:2}} >{message.content}</Text>
      {(!messages[index+1] || messages[index+1].sender!==message.sender)?
      <Avatar rounded size={18} source={{ uri: 'https://i.pinimg.com/736x/c8/ff/88/c8ff88ba5d7c2844bfbeaaa0837d1de5.jpg' }}/>:<></>
      }
      </View>)
    }):<Text>No messages</Text>}
    </ScrollView>
    </View>
    <View style={styles.inputBox}>
      <TextInput style={{flex:7,fontSize:17,color:'white'}} placeholderTextColor={'white'} value={messageText} onChangeText={(value)=> setMessageText(value) } placeholder='Aa' />
      <TouchableOpacity  onPress={()=>{sendMessage()}} style={{flex:1,alignItems:'center',justifyContent:'center',}}><Icon style={{fontSize:25,color:'white'}} name="send" /></TouchableOpacity>
    </View>
    </View>
   
  )
}
export default InboxScreen

const styles = StyleSheet.create({
  main:{
    flex:1,
    marginHorizontal:10,
    marginVertical:10   
  },
  scrollView:{
    flex:13
  },
  inputBox:{
    flex:1,
    padding:4,
    flexDirection:'row',
    backgroundColor:'#3a3b3c',
    borderRadius:20 ,
    alignItems:'center' 
  }
})