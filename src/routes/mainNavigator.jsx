import { Text, View } from 'react-native'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch,useSelector } from 'react-redux';
import HomeScreen from './home';
import Profile from './profile';
import InboxScreen from './inbox';
const Tab = createBottomTabNavigator(); 
function MainNavigator ({navigation}){
  const dispatch = useDispatch();
  const data=  useSelector(state=>{
    return state.user.userData;
  })
  return(
    data?data.accountType=="candidate"?
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'planet'
              : 'planet-outline';
          } else if (route.name === 'Inbox') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          }else if(route.name==='Jobs'){
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          }else if(route.name==='Profile'){
            iconName = focused ? 'person-circle-outline' : 'person-circle-outline';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarLabel:route.name+" ",  
      })} >
        <Tab.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
        <Tab.Screen name="Jobs" component={Profile} options={{headerShown:false}}/>
        <Tab.Screen name="Inbox" component={InboxScreen} options={{headerShown:false}} />
        <Tab.Screen name="Profile" component={Profile} options={{headerShown:false}} />
      </Tab.Navigator>:<Text>Recruiter Screen Banauna baki xa... hehe</Text>:navigation.replace("Splash")

  );
    
}
export default MainNavigator