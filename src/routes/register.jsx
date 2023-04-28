import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        Welcome to Job Portal App
      </Text>
      <Text h4 style={styles.subtitle}>
        Please choose your role
      </Text>
      <Button
        title=" Job Seeker"
        type="solid"
        containerStyle={styles.button}
        icon={<Icon name="user" size={15} color="#fff" />}
        iconLeft
        onPress={() => navigation.navigate('RegisterCandidate')}
      />
      <Button
        title=" Recruiter"
        type="outline"
        containerStyle={styles.button}
        icon={<Icon name="briefcase" size={15} color="#000" />}
        iconLeft
        onPress={() => navigation.navigate('RegisterRecruiter')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    margin: 10,
  },
  subtitle: {
    margin: 10,
  },
  button: {
    width: 200,
    margin: 10,
  },
});

export default RegisterScreen;