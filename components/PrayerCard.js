import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Divider, ListItem } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome5';

const PrayerCard = ({title, context, user}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.postHeader}>{title}</Text>
            <Text style={styles.postContent}>{context}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.prayingButton}>
                    <Icon style={styles.buttonIcon} name="pray" size={20} color="#0097e6"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.commentButton}>
                    <Icon style={styles.buttonIcon} name="comments" size={20} color="#0097e6"/>
                </TouchableOpacity>
                <Text style={styles.username}>{user}</Text>
            </View>
            <Divider style={{ height: .5, backgroundColor: 'grey' }} />
        </View>
    );
}

export default PrayerCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    postHeader: {
        fontSize: 18,
        fontWeight: '700',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
    },
    postContent: {
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 5,
    },
    prayingButton: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 5,
    },
    commentButton :{
        flexDirection: 'row',
        flex: 3,
        alignItems: 'center',
        backgroundColor: '#fff',
        marginLeft: 10,
        borderRadius: 5,
        padding: 5,
    },
    username: {
        flexDirection: 'row',
        flex: 2,
        fontSize: 14,
        color: '#2c5282',
        fontWeight: '700'
    },
    buttonText: {
        fontSize: 14,
        color: '#0097e6'
    }

});