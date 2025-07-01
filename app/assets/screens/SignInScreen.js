import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const usersDB = [
  { username: 'anjal', password: '1234' },
  { username: 'faiq', password: '1234' },
  { username: 'brandon', password: '1234' },
  { username: 'choi', password: '1234' },
  { username: 'nao', password: '1234' },
  { username: 'yarik', password: '1234' },
  { username: 'niko', password: '1234' },
];

function SignInScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    const userFound = usersDB.find(
      user => user.username === username && user.password === password
    );

    if (userFound) {
      Alert.alert('Username alread Exist', ` ${username}`);
      
    } 
    else if (username =="" || password =="") {
        Alert.alert("Please fill the username or password")
      

    }
    else {
      Alert.alert('SingIn Scussesful', `, ${username}`);
      navigation.replace('SurveyForm');
      console.log("username: "+username+" password: "+password) //this prints the user name and password into the console.
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>3Scapey</Text>
      <Text style={styles.subtitle}>Enhancing Travel</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={20} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    paddingHorizontal: 30,
    backgroundColor: '#fefefe',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 25,
    paddingBottom: 5,
  },
  icon: {
    marginRight: 10,
    color: '#555',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  signinButton: {
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#aaa',
  },
  orText: {
    marginHorizontal: 10,
    color: '#888',
  },
});

export default SignInScreen;