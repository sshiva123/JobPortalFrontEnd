
import React, { useState ,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ActivityIndicator,Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import address from '../../address';
import { Avatar } from 'react-native-elements';
const ConnectionErrorPage = ({navigation}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [retry,setRetry]=useState(false);
  
  const handleRetry = () => {
    setRetry(true);
   setTimeout(() => {
    
       return setRetry(false)
      
    }, 5000); 
    // Check internet connection using fetch API
    fetch('http://'+address+':3000/')
      .then((response) => {
        if (response.ok) {
          // Update state if connection is available
          setIsConnected(true);
          navigation.replace("Splash")
        }
      })
      .catch((error) => {
        // Handle error if connection is not available
        console.error(error);
      });
  };

  const renderErrorPage = () => {
    return (
      <LinearGradient
        colors={['#ff5f6d', '#ffc371']} // Array of colors for gradient
        start={{ x: 0, y: 0 }} // Start point of gradient
        end={{ x: 1, y: 1 }} // End point of gradient
        style={styles.container}>
       
        <Image style={{width:300,height:300,borderRadius:150}} source= { require('../assets/images/gif/noInternet.gif') } />
        <Text style={styles.text}>No internet connection</Text>
        <TouchableOpacity style={styles.button} onPress={retry?()=>{}:handleRetry}>
            {retry?<ActivityIndicator style={styles.buttonText}/>:<Text style={styles.buttonText}>Retry</Text>}
          
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  return isConnected ? (
    <View>
      {/* Render your app content here */}
    </View>
  ) : (
    renderErrorPage()
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff5f6d',
  },
});

export default ConnectionErrorPage;