import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';

import { Divider } from 'react-native-elements';
import { material } from 'react-native-typography';
import Icon from 'react-native-vector-icons/Feather';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrayerList({navigation}) {
    return (
        <View style={styles.container}>
            <Header style={styles.title} title="Prayer List" />
            <View style={[tailwind('flex-1 bg-blue-800'), styles.mainContainer]}>

            </View>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});