// Import React and React Native components
import React, { useState } from "react";
import { View, Text, TextInput,Dimensions, TouchableOpacity, StyleSheet,Alert, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import countries from "../values/country";
import address from "../../address";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// Define a function component for the register screen

const RegisterCandidate = ({ navigation }) => {
  // Define state variables for the user input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [skills, setSkills] = useState("");

  // Define a function to handle the register button press
  const handleRegister = async() => {
    // Validate the user input
    const data={
      name:name.trim(),
      email:email,
      password:password,
      phone:phone,
      accountType:"candidate",
      location:{country:country}
    }
    if (
      name.trim() &&
      email &&
      password &&
      confirmPassword &&
      phone &&
      country 
      
    ) {
      // Check if the password and confirm password match
      if(password.length<8){
        alert("Password must be at least 8 characters long");
        return;
      }
      if (password !== confirmPassword) {
         // Show an error message if the passwords do not match
         alert("Passwords do not match!");
        return ;
      } 
      if(!/^[a-zA-Z ]*$/.test(name)){
        alert("Invalid Name");
        return;
      }
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        alert("Invalid Email");
        return;
      }
      const res=await fetch('http://'+address+':3000/candidates', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
       body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.message=="Success"){          Alert.alert(
            "Success",
            "Registration Successful",
            [
              
              { text: "OK", onPress: () => navigation.navigate('Splash') }
            ],
            { cancelable: false }
          );}
          else{
            Alert.alert(data.message)
          }
  
        })
        .catch((error) => {
          console.error(error);
        });
        
      
    
    } else {
      // Show an error message if any field is empty
      alert("Please fill all the fields!");
    }
      
   
  };

  // Return the JSX code for rendering the register screen
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center',alignItems:'center' }} style={{width:'100%'}}>
      <View style={styles.titleContainer}>
          <Text style={styles.title}>Register as a candidate</Text>
        </View>
        <View style={[styles.container,{width:'100%'}]}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
         <View style={{flexDirection:'row',borderWidth:1,width:'80%',borderRadius:10,backgroundColor: "#fff",borderColor:'gray',height:50,margin:10,alignItems:'center',}}>
      <Text style={[styles.label,{flex:2}]}>  Country</Text>
       <Picker
        style={{flex:5,height:40}}
        selectedValue={country}
        onValueChange={(itemValue) => setCountry(itemValue)}
      >
        {countries.map((country) => (
          <Picker.Item key={country.value} label={country.label} value={country.value} />
        ))}
      </Picker>
      </View>
       
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// Define a style object for the register screen
const styles = StyleSheet.create({
  container: {
    
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    margin: 20,
    color: "#333",
  },
  titleContainer: {
    height:windowHeight/2.5,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    backgroundColor: "#fff",
  },
  button: {
    width: "80%",
    height: 50,
    borderRadius: 10,
    margin: 10,
    marginBottom:10,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

// Export the register screen component
export default RegisterCandidate;