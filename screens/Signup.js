import React, { useState } from 'react';
import {
  SafeAreaView, Text, View, TextInput, Keyboard, TouchableOpacity, TouchableWithoutFeedback, Alert
} from 'react-native';
import tailwind from 'tailwind-rn';

import Firebase from '../lib/firebase';

const Signup = ({ navigation }) => {
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const user = {
    first: firstName,
    last: lastName,
    username: username,
    email: email,
    groups: [],
    prayerList: [],
  }

  const addUserByEmailAndPassword = async () => {
    await Firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      let user = Firebase.auth().currentUser;
      user.updateProfile({
        displayName: username,
      }).catch(err => Alert.alert('Error', err.message));
    }).catch(err => Alert.alert('Error', err.message));
  }

  const checkUsername = async () => {
    const doc  = await Firebase.firestore().collection('users').doc(`${username}`).get().then(async() => {
      if (!doc.exists) {
        await Firebase.firestore().collection('users').doc(`${username}`).add({user}).catch();
      } else {
        Alert.alert('Username is taken', 'Please choose a different username.');
        setUsername('');
        return;
      }
    });
  }

  const handleSignup = async () => {
    try {
      if (!firstName || !lastName || !username || !email || !password) {
        Alert.alert('Error', 'Please fill in all fields.');
        return;
      }
      addUserByEmailAndPassword();
      checkUsername();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <SafeAreaView style={tailwind('flex-1')}>
      <View style={tailwind('py-10 px-5')}>
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        <Text style={tailwind('text-4xl font-bold')}>
          Sign up
        </Text>

        <View style={tailwind('mt-10')}>
          <TextInput
            placeholder="First Name"
            onChangeText={(val) => setFirstName(val)}
            maxLength={15}
            style={tailwind('text-lg border-b-2 border-blue-500 mt-5')}
          />
          <TextInput
            placeholder="Last Name"
            onChangeText={(val) => setLastName(val)}
            maxLength={15}
            style={tailwind('text-lg border-b-2 border-blue-500 mt-5')}
          />
          <TextInput
            placeholder="Username"
            onChangeText={(val) => setUsername(val)}
            autoCapitalize="none"
            maxLength={15}
            style={tailwind('text-lg border-b-2 border-blue-500 mt-5')}
          />
          <TextInput
            placeholder="Email"
            onChangeText={(val) => setEmail(val)}
            autoCapitalize="none"
            style={tailwind('text-lg border-b-2 border-blue-500 mt-5')}
          />
          <TextInput
            placeholder="Password"
            onChangeText={(val) => setPassword(val)}
            autoCapitalize="none"
            secureTextEntry
            style={tailwind('text-lg border-b-2 border-blue-500 mt-5')}
          />

          <TouchableOpacity
            style={tailwind('bg-blue-500 rounded-lg py-3 mt-10')}
            onPress={handleSignup}
          >
            <Text style={tailwind('text-white text-center font-bold text-lg')}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tailwind('mt-2 flex-row justify-center')}>
          <Text>Already have an account?</Text>
          <TouchableOpacity
            style={tailwind('ml-1')}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={tailwind('text-blue-500')}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Signup;