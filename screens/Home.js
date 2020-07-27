import React, { useState, useEffect} from 'react';
import { Alert, RefreshControl, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Firebase from '../lib/firebase';

import PrayerCard from '../components/PrayerCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home({navigation}) {
  const [prayers, setPrayers] = useState([]);  
  const [refreshing, setRefreshing] = React.useState(false);

  // Firebase.auth().onAuthStateChanged(() => {
  //   if (Firebase.auth().currentUser) getPrayers();
  // });

  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      getPrayers().then(() => setRefreshing(false)).catch();
  }, [refreshing]);

  async function getPrayers() {
    var postedPrayers = [];
    await Firebase.firestore().collection('groups').doc('groupA').collection('prayers')
    .get()
    .then(prayers => prayers.forEach(prayer => {
      if (prayer.exists) postedPrayers.push(prayer.data());
      // HANDLE IF THERE ARE NO PRAYERS
    }))
    .catch();
    setPrayers(postedPrayers); // Set the local state equal to retrieved state
  }

    return (
        <View style={styles.container}>
            <Header style={styles.title} title="Post A Prayer" />
            <View style={styles.postContainer}>
              <ScrollView
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
              >
                  {
                    prayers.length === 0 &&
                    <Text style={styles.noPosts}>No prayers at the moment.{"\n"}Pull down to refresh.</Text>
                  }
                  {
                    prayers.length > 0 &&
                    prayers.map((prayer, i) => {
                    return (
                      <PrayerCard key={i} title={prayer.title} context={prayer.context} user={prayer.user} />
                    )
                  })}
              </ScrollView>
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
    postContainer: {
      flex: 6,
      padding: 0,
      backgroundColor: '#2c5282'
    },
    noPosts: {
      flex: 1,
      marginTop: 50,
      fontSize: 18,
      color: '#fff',
      textAlign: 'center',
    }
  });