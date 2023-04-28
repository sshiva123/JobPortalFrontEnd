// Import React and React Native components
import React, { useState } from 'react';
import { View, Text, TextInput, Button,StyleSheet,TouchableOpacity,Alert } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import address from '../../address';
import { addUser } from '../store/slices/userSlice';
import EncryptedStorage from 'react-native-encrypted-storage';
    // Define a function to validate email using regular expression
const validateEmail = async (email) => {
    // Source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  // Define a function to validate password length
  const validatePassword = (password) => {
    return password.length >= 8;
  };
  // Define a function component for the login page
  const Login = ({ navigation }) => {
    async function storeUserSession(data) {
      try {
          await EncryptedStorage.setItem(
              "user",data);

          // Congrats! You've just stored your first value!
      } catch (error) {
          // There was an error on the native side
      }
  }
    //dispatch for redux-toolkit-
    const dispatch = useDispatch();
    // Use state hooks to store the email and password inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Use state hooks to store the validation results
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    // Define a handler function for email input change
    const handleEmailChange = (text) => {
      // Set the email state to the input text
      setEmail(text);
      // Validate the email and set the email valid state accordingly
      setEmailValid(validateEmail(text));
    };
    // Define a handler function for password input change
    const handlePasswordChange = (text) => {
      // Set the password state to the input text
      setPassword(text);
      // Validate the password and set the password valid state accordingly
      setPasswordValid(validatePassword(text));
    };
    // Define a handler function for login button press
    const handleLoginPress = async() => {
      // For now, just log the email and password to the console
      
      const res=await fetch('http://'+address+':3000/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
       body: JSON.stringify({"email":email,"password":password}),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.message=="Logged in successfully"){
              storeUserSession(data.user._id);
             dispatch(addUser(data.user));
             navigation.replace("Main");
            
        }else{
          Alert.alert("Invalid Credentials");
        }
                  
        })
        .catch((error) => {
          
        });
      
      // You can add more logic here to perform authentication or navigation
    };
    // Define a handler function for register button press
    const handleRegisterPress = () => {
      // Navigate to the register page using navigation prop
      navigation.navigate('Register');
      // You can pass some params here if needed
    };
    // Return the JSX elements for rendering
    
    return (
    <>
    <View style={styles.container}>
    <Text style={styles.title}>Job Portal</Text>
    
    <TextInput
    style={styles.input}
    placeholder='Enter your email'
    value={email}
    onChangeText={handleEmailChange}
    />
    
    <TextInput
    style={styles.input}
    placeholder='Enter your password'
    value={password}
    onChangeText={handlePasswordChange}
    secureTextEntry={true}
    />
    <View style={{width:'80%',justifyContent:'center',alignItems:'center'}}>
    <TouchableOpacity
        style={[styles.button,{ backgroundColor: !emailValid || !passwordValid ? "gray" : "blue",}]}
        onPress={handleLoginPress}
        disabled={!emailValid || !passwordValid}
        >
        <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
    </View>
    </View>
    <View style={{flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',}}>
        <View style={{alignItems: 'center',
    justifyContent: 'center',width:'80%',flex:1}}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity
            style={[styles.button,{backgroundColor:'green',width:'50%'}]}
            onPress={ handleRegisterPress }
            >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          </View>
      </View>
    </>
    );
    };
    
    // Define some styles for the components
    const styles = StyleSheet.create({
    container: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    },
    title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    },
    input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius:5,
    },
    button: {
        width:'50%',
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        margin:10,
        borderRadius:5,
        borderWidth:2
      },
      buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
      },
    });

export default Login;