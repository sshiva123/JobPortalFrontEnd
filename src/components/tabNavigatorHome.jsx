import React, { useState } from 'react';
import { StyleSheet, View,Dimensions,Text ,Image} from 'react-native';

import { TabView, SceneMap } from 'react-native-tab-view';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Recommended = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} ><Image style={{flex:1}} source={{uri:'https://i0.wp.com/www.sharonkgilbert.com/wp-content/uploads/2015/12/Under-construction-1.png'}} /></View>
);

const Categories = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} ><Image style={{flex:1}} source={{uri:'https://i0.wp.com/www.sharonkgilbert.com/wp-content/uploads/2015/12/Under-construction-1.png'}} /></View>
);

const Popular = () => (
  <View style={[styles.scene, { backgroundColor: '#4caf50' }]} ><Image style={{flex:1}} source={{uri:'https://i0.wp.com/www.sharonkgilbert.com/wp-content/uploads/2015/12/Under-construction-1.png'}} /></View>
);

const RecentlyAdded = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} ><Image style={{flex:1}} source={{uri:'https://i0.wp.com/www.sharonkgilbert.com/wp-content/uploads/2015/12/Under-construction-1.png'}} /></View>
);



const Tab=createMaterialTopTabNavigator()

const TabNavigatorHome = () => {


  return (
    <Tab.Navigator screenOptions={{tabBarStyle: { backgroundColor: '#009CB8'}}}>
        <Tab.Screen name="Recommended" component={Recommended} />
        <Tab.Screen name="Popular" component={Popular} />
        <Tab.Screen name="Recent" component={RecentlyAdded} />
    </Tab.Navigator>
   
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

export default TabNavigatorHome;