import React, { useState } from 'react';
import { View,Text, TextInput, Button,Dimensions, StyleSheet, Alert,TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NavigationActions } from 'react-navigation';
import address from '../../address';
import { ScrollView } from 'react-native-gesture-handler';
import countries from '../values/country';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('NP');
  const [company, setCompany] = useState('');

  const handleSubmit = async() => {
    if (!name) {
      Alert.alert('Error', 'Name is required');
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Error', 'Email is invalid');
      return;
    }
    if (!password || password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }
    if (!phone) {
      Alert.alert('Error', 'Phone is required');
      return;
    }

    const data = {
      name:name,
      email:email,
      password:password,
      phone:phone,
      accountType:"recruiter",
      location: {
        country:country,
      },
      company:company,
    };

    const res=await fetch('http://'+address+':3000/recruiters', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
     body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        Alert.alert(
          "Success",
          "Registration Successful",
          [
            
            { text: "OK", onPress: () => navigation.navigate('Login') }
          ],
          { cancelable: false }
        );

      })
      .catch((error) => {
        console.error(error);
      });
      
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center',alignItems:'center' }}  style={{flex:1,width:windowWidth}}>
      <View style={{alignItems:'center',justifyContent:'center',height:windowHeight/3 }}>
        <Text style={{ fontSize: 32,color:'black' }}>Recruiter SignUp</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={(text) => setPhone(text)}
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
      <TextInput
        style={styles.input}
        placeholder="Company"
        value={company}
        onChangeText={(text) => setCompany(text)}
      />
      <TouchableOpacity style={styles.button} title="Submit" onPress={handleSubmit}><Text style={{fontSize:18,color:'black'}}>Submit</Text>
        </TouchableOpacity>
        </ScrollView>
    </View>
  );
};
export default RegisterScreen;