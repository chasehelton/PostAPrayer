import React from 'react';
import { Alert, Keyboard, StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import tailwind from 'tailwind-rn';
import 'react-native-get-random-values'

import Header from '../components/Header';
import Footer from '../components/Footer';

import Firebase from '../lib/firebase';

export default function CreatePrayer({navigation}) {
    const [title, setTitle] = React.useState('');
    const [context, setContext] = React.useState('');

    const handleCancel = () => {
        Alert.alert(
            'Are you sure?',
            '',
            [
                { text: "Yes", onPress: () => {
                    setTitle('');
                    setContext('');
                    navigation.navigate('Home');
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

    const handleSubmit = async() => {
        try {
            if (!title || !context) {
                Alert.alert('Error', 'Please fill in both the title and context fields.');
                return;
            }

            const docRef = Firebase.firestore().collection('groups').doc('groupA').collection('prayers').doc();
            const newId = docRef.id;
            // ADD THEM BY DATE ADDED
            await Firebase.firestore().collection('groups').doc('groupA').collection('prayers').doc(newId).set({
                user: Firebase.auth().currentUser.displayName,
                title: title,
                context: context
            }).catch();
            setTitle('');
            setContext('');
            Alert.alert('Success!');

        } catch (error) {
            Alert.alert('Error', error.message);
        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Header title="Create Prayer" />
                <View style={[tailwind('flex-1 bg-blue-800'), styles.editArea]}>
                    <View style={tailwind('py-10 px-5')}>
                        <TextInput
                            placeholder="Title"
                            onChangeText={(val) => setTitle(val)}
                            style={tailwind('rounded-sm text-xl border-b-2 border-blue-500 bg-gray-200 p-2')}
                            maxLength={40}
                            value={title}
                        />
                        <Text>{"\n"}</Text>
                        <TextInput
                            placeholder="Context"
                            onChangeText={(val) => setContext(val)}
                            style={[tailwind('rounded-sm text-xl border-b-2 border-blue-500 bg-gray-200 p-2'), styles.context]}
                            multiline={true}
                            maxLength={220}
                            value={context}
                        />
                        <TouchableOpacity
                            style={tailwind('bg-blue-500 rounded-lg py-3 mt-10')}
                            onPress={handleSubmit}
                        >
                            <Text style={tailwind('text-white text-center font-bold text-lg')}>
                            Create
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={tailwind('bg-red-500 rounded-lg py-3 mt-4')} onPress={handleCancel}>
                            <Text style={tailwind('text-lg font-bold text-white text-center')}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Footer/>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    editArea: {
        flex: 6,
    },
    context: {
        height: 100,
        textAlignVertical: 'top',
    }
});