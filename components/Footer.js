import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Divider } from 'react-native-elements';
import { material } from 'react-native-typography';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

export default function Footer(props) {
    const navigation = useNavigation();
    return (
        <>
            <Divider style={{ backgroundColor: '#00a8ff' }} />
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Prayer List')} >
                    <Text style={[material.button, styles.buttonText]}>Prayer List</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Create Prayer')}>
                    <Icon name="plus-circle" size={60} color="#0097e6" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('My Groups')}>
                    <Text style={[material.button, styles.buttonText]}>My Groups</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
footer: {
    //flex: 1,
    flexDirection: 'row',
},
button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
},
buttonText: {
    fontSize: 20
}
})