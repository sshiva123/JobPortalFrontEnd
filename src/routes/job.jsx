import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import JobDisplay from './jobDisplay';



const JobScreen = () => {
  return (
    <View>
      <Text>JobScreen</Text>
    </View>
  )
}


const Job = ({navigation}) => {
    const Stack=createStackNavigator();
  return (
    <Stack.Navigator >
        <Stack.Screen name="JobScreen" component={JobScreen} options={{headerShown:false}}/>
        <Stack.Screen name="JobDisplay" component={JobDisplay}  options={{title:'Job', headerShown:true}} />
    </Stack.Navigator>
    
  )
}

export default Job

const styles = StyleSheet.create({})