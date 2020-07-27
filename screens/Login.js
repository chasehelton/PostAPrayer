import React, { useState } from 'react';
import {
  SafeAreaView, Text, View, TextInput, Keyboard, TouchableOpacity, TouchableWithoutFeedback, Alert,
} from 'react-native';
import tailwind from 'tailwind-rn';
import AsyncStorage from '@react-native-community/async-storage';

import Firebase from '../lib/firebase';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await Firebase.auth().signInWithEmailAndPassword(email, password);
      await Firebase.firestore().collection('users').doc(`${email}`).get().catch();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  
  var auth = Firebase.auth();
  const resetPassword = async () => {
    if (email) {
        auth.sendPasswordResetEmail(email).then(function() {
        Alert.alert('Success! Check your email for a reset link.')
      }).catch(function(error) {
        Alert.alert('Error', error.message);
      });
    } else {Alert.alert('Please enter your email above to send the reset link to.')}
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <SafeAreaView style={tailwind('flex-1 justify-center')}>
      <View style={tailwind('py-10 px-5')}>
        <Text style={tailwind('text-4xl font-bold')}>
          Login
        </Text>

        <View style={tailwind('mt-10')}>
          <TextInput
            placeholder="Email"
            onChangeText={(val) => setEmail(val)}
            autoCapitalize="none"
            style={tailwind('text-lg border-b-2 border-blue-500')}
          />
          <TextInput
            placeholder="Password"
            onChangeText={(val) => setPassword(val)}
            secureTextEntry
            style={tailwind('text-lg border-b-2 border-blue-500 mt-5')}
          />

          <TouchableOpacity
            style={tailwind('bg-blue-500 rounded-lg py-3 mt-10')}
            onPress={handleLogin}
          >
            <Text style={tailwind('text-white text-center font-bold text-lg rounded-lg')}>
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tailwind('mt-2 flex-row justify-center')}>
          <Text>Not a member yet?</Text>
          <TouchableOpacity
            style={tailwind('ml-1')}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={tailwind('text-blue-500')}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tailwind('mt-2 flex-row justify-center')}>
          <TouchableOpacity
            style={tailwind('ml-1')}
            onPress={resetPassword}
          >
            <Text style={tailwind('text-blue-500')}>
              Reset Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Login;