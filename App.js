import React, { useEffect ,useState} from 'react';
import address from './address';
import { Text, View, ActivityIndicator,Button } from 'react-native';
import { NavigationContainer,StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider,useDispatch ,useSelector} from 'react-redux';
import { addUser } from './src/store/slices/userSlice';
import {store} from './src/store/store';
import { LongPressGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/longPressGesture';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Login from './src/routes/login';
import HomeScreen from './src/routes/home';
import { SafeAreaView } from 'react-native-safe-area-context';
import RegisterRecruiter from './src/routes/registerRecruiter';
import RegisterCandidate from './src/routes/registerCandidate';
import MainNavigator from './src/routes/mainNavigator';
import EncryptedStorage from 'react-native-encrypted-storage';
import Register from './src/routes/register';
import ConnectionErrorPage from './src/routes/connectionError';
import JobDisplay from './src/routes/jobDisplay';
import { Screen } from 'react-native-screens';
//import Register from './src/routes/register';
import { SocketContext, socket } from './SocketContext';


const Stack = createStackNavigator();

const SplashScreen = ({ navigation }) => {
  const [con,setCon]=useState(false);
  const dispatchRedux = useDispatch();
  async function storeUserSession(data) {
    try {
        await EncryptedStorage.setItem(
            "user",data);   
        // Congrats! You've just stored your first value!
    } catch (error) {
        // There was an error on the native side
    }
}
   async function getUserDetail(){
      const timer= setTimeout(() => {
       
      if(!con){ return navigateToErrorPage();}
    }, 5000); 
    try {            
       EncryptedStorage.getItem("user").then( session => {
        // do something with session
        console.log(session)
        if(session!=undefined && session!=''){
          //clearTimeout(timer);
          console.log("Session is not undefined.Fetching")
           fetch('http://'+address+':3000/detail/'+session, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
        .then((data) => {
          setCon(true);
          clearTimeout(timer);
          console.log(con)
          console.log(data)
          if(data.message=="Success"){
            console.log("message success received")
              storeUserSession(data.user._id).then(()=>{
              dispatchRedux(addUser(data.user));
             return navigation.replace("Main")
             });
             
            
         }else{
          console.log("or maybe this is the issue")
            clearTimeout(timer);
            return navigation.replace("Login");
          }          
        })
        .catch((error) => {
          console.log("maybehere?")
          clearTimeout(timer);
         return navigation.replace("ConnectionError");
        });
        }
        else{
          console.log("here?")
          fetch('http://'+address+':3000/detail/').then(()=>{
            clearTimeout(timer);
            return navigation.replace("Login");
          })
        }   
      });
      // ...
    } catch (error) {
      console.log("Error received???")
        return navigation.replace("Login");
      // ...
    }
  }
  function navigateToErrorPage() {
    return navigation.replace("ConnectionError");
  }
  useEffect(() => { 
    try{
     
      getUserDetail().then(response=>{
        responseReceived=true;
      });
    }catch(err){
      navigation.replace("ConnectionError");
    }
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 32,color:'black' }}>Job Portal</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};


const App = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      setConnected(true);
    });
    socket.on('disconnect', () => {
      setConnected(false);
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  if (!connected) {
   console.log("Disconnected")
  }else{
    console.log('Connected')
  }
  return (
    <SocketContext.Provider value={socket}>
    <Provider store={store} >
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" >
        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}} />
        <Stack.Screen name="ConnectionError" component={ ConnectionErrorPage}options={{ headerShown:false }} />
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>  
        <Stack.Screen name="Register" component={Register} />  
        <Stack.Screen name="RegisterRecruiter" component={RegisterRecruiter} />  
        <Stack.Screen name="RegisterCandidate" component={RegisterCandidate} /> 
        <Stack.Screen name="Main" component={MainNavigator} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    </SocketContext.Provider>
  );
};

export default App;