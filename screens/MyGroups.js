import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MyGroups({navigation}) {
    return (
        <View style={styles.container}>
            <Header style={styles.title} title="My Groups" />
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