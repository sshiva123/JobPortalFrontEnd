import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Text } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch,useSelector } from 'react-redux';
import {removeUser} from '../../store/slices/userSlice';
import EncryptedStorage from 'react-native-encrypted-storage';

import { createStackNavigator } from '@react-navigation/stack';
const ProfileScreenMain = ({ navigation }) => {
  const dispatch = useDispatch();
  const data=  useSelector(state=>{
    return state.user.userData;
  })
  async function logOut(){
   dispatch(removeUser());
     await EncryptedStorage.setItem("user",'')
          navigation.replace("Login");
  }
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <Avatar
        size="xlarge"
        rounded
        source={{
          uri:data.displayPicture?data.displayPicture:'https://i.pinimg.com/736x/c8/ff/88/c8ff88ba5d7c2844bfbeaaa0837d1de5.jpg' ,
        }}
        containerStyle={styles.avatar}
      />
      <Text h4 style={styles.name}>
        {data.name}
      </Text>
      <Button
        title="Edit Profile  "
        type="solid"
        containerStyle={styles.button}
        icon={<Icon name="create" size={20} color="#fff" />}
        iconRight
        onPress={() => navigation.navigate('EditProfile')}
      />
        <Button
        title="Logout  "
        type="solid"
        containerStyle={styles.button}
        icon={<Icon name="log-out" size={20} color="#fff" />}
        iconRight
        onPress={logOut}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  name: {
    margin: 10,
    color: '#fff',
  },
  button: {
    width: 200,
    margin: 10,
  },
});



const ProfileScreen = () => {
  const Stack=createStackNavigator();
  return (
    <Stack.Navigator initialRouteName='MainProfile' >
      <Stack.Screen name="MainProfile" component={ProfileScreenMain} options={{headerShown:false}} />
      { //<Stack.Screen name="EditSkill" component={editSkill} options={{headerShown:false}} />
        }
    </Stack.Navigator>
  )
}


export default ProfileScreen;