import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import { ListItem, colors } from 'react-native-elements'
import tailwind from 'tailwind-rn';
import AsyncStorage from '@react-native-community/async-storage';

import Header from '../components/Header';
import Footer from '../components/Footer';

import Firebase from '../lib/firebase';

export default function Settings({navigation}) {
    const currentUser = Firebase.auth().currentUser;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [user, setUser] = useState({});
    const [editting, setEditting] = useState(false);

    useEffect(() => {
        setUser(Firebase.auth().currentUser);
    }, [user]);

    const handleEditCancel = () => {
        Alert.alert(
            'Are you sure?',
            '',
            [
                { text: "Yes", onPress: () => {
                    setFirstName('');
                    setLastName('');
                    setUsername('');
                    setEditting(false);
                }},
                {
                  text: "No",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
            ],
            { cancelable: false }
        );
    }

    const handleSave = async () => {
        try {
            if (!firstName || !lastName || !username) {
                Alert.alert('Error', 'Please fill in the fields.');
                return;
            }
            await Firebase.firestore().collection('users').doc(currentUser.email).set({
                first: firstName,
                last: lastName,
                username: username
            }).then(
                Firebase.auth().currentUser.updateProfile({
                    displayName: username
                })
            ).catch();
            setFirstName('');
            setLastName('');
            setUsername('');
            setEditting(false);
            Alert.alert('Success!');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    }

    const handleSignout = () => {
        Firebase.auth().signOut().then().catch(err => {Alert.alert('Error', err.message);});
    }

    const handleEdit = () => {
        setEditting(true);
    }

    return (
        <>
        {
            !editting && (
            <View style={styles.container}>
                <Header style={styles.title} title="Settings" />
                <View style={tailwind('flex-1 bg-blue-800')}>
                    <ListItem
                        title={<Text style={styles.profilebutton}>{user.displayName}</Text>}
                        leftAvatar={{ source: { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" } }}
                        bottomDivider
                    />
                    {/* <ListItem
                        title={<Text style={styles.editProfile}>Edit Profile</Text>}
                        bottomDivider
                        onPress={handleEdit}
                    /> */}
                    <ListItem
                        title={<Text style={styles.signout}>Signout</Text>}
                        bottomDivider
                        onPress={handleSignout}
                    />
                </View>
                <Footer/>
            </View>
        )}
        {/* {
            editting && (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Header title="Edit Profile" />
                    <View style={[tailwind('flex-1 bg-blue-800'), styles.editArea]}>
                        <View style={tailwind('py-10 px-5')}>
                            <TextInput
                                placeholder="First Name"
                                onChangeText={(val) => setFirstName(val)}
                                style={tailwind('rounded-sm text-xl border-b-2 border-blue-500 bg-gray-200 p-2')}
                                maxLength={15}
                                value={firstName}
                            />
                            <Text>{"\n"}</Text>
                            <TextInput
                                placeholder="Last Name"
                                onChangeText={(val) => setLastName(val)}
                                style={tailwind('rounded-sm text-xl border-b-2 border-blue-500 bg-gray-200 p-2')}
                                maxLength={15}
                                value={lastName}
                            />
                            <Text>{"\n"}</Text>
                            <TextInput
                                placeholder="Username"
                                onChangeText={(val) => setUsername(val)}
                                style={tailwind('rounded-sm text-xl border-b-2 border-blue-500 bg-gray-200 p-2')}
                                maxLength={15}
                                value={username}
                            />
                            <TouchableOpacity
                                style={tailwind('bg-blue-500 rounded-lg py-3 mt-10')}
                                onPress={handleSave}
                            >
                                <Text style={tailwind('text-white text-center font-bold text-lg')}>
                                    Save
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={tailwind('bg-red-500 rounded-lg py-3 mt-4')} onPress={handleEditCancel}>
                                <Text style={tailwind('text-lg font-bold text-white text-center')}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Footer/>
                </View>
            </TouchableWithoutFeedback>
        )} */}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    profilebutton: {
        color: '#00a8ff',
        fontSize: 30,
    },
    buttontext: {
        color: '#00a8ff',
        fontSize: 20,
    },
    editProfile: {
        color: '#00a8ff',
        fontSize: 20,
    },
    signout: {
        color: 'red',
        fontSize: 20,
    },
    
});