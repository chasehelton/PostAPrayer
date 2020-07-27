import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Divider } from 'react-native-elements';
import { material } from 'react-native-typography';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

export default function Header(props) {
    const navigation = useNavigation();
    return (
        <>
            <View style={styles.headerContainer}>
                <Icon style={styles.hamburger} name="menu" size={25} color="#00a8ff" onPress={() => navigation.toggleDrawer()}/>
                <Text style={[material.display2, styles.title]}>{ props.title }</Text>
                <Icon style={styles.home} name="home" size={25} color="#00a8ff" onPress={() => navigation.navigate('Home')}/>
            </View>
            <Divider style={{ height: 2, backgroundColor: '#00a8ff' }} />
        </>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 50,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    title: {
        color: '#00a8ff',
        alignSelf: 'center'
    },
    hamburger: {
        alignSelf: 'center',
        marginLeft: 8,
    },
    home: {
        alignSelf: 'center',
        marginRight: 8
    }
});