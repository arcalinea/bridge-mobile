import React from 'react';
import { ScrollView, StyleSheet, View, Image, Text, Platform, ActivityIndicator } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import SocialIcon from '../components/SocialIcon';


export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
       <View style={styles.profileHeader}>
         <Image
           source={require('../assets/images/j-twitter-profile.jpg')}
           style={styles.profileImage}
         />
         
         <Text style={styles.profileText}>
            Into p2p networks, foxes, cryptography, orchids, and the ocean.
         </Text>
       </View>
       
       <View style={styles.socialProfiles}>
         <View style={styles.socialLink}>
                <SocialIcon name={Platform.OS === 'ios' ? `ios-logo-twitter${focused ? '' : '-outline'}` : 'logo-twitter'}/>
                <Text style={styles.socialText}>@arcalinea on Twitter</Text>
         </View>
         
         <View style={styles.socialLink}>
                <SocialIcon name={Platform.OS === 'ios' ? `ios-logo-facebook${focused ? '' : '-outline'}` : 'logo-facebook'}/>
                <Text style={styles.socialText}>Jay Graber on Facebook</Text>
         </View>
       </View>
       
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  profileText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center', 
    margin: 20,
  },
  socialProfiles: {
      marginHorizontal: 30,
      flex: 1,
      flexDirection: 'column',
  },
  socialLink: {
      flex: 1,
      flexDirection: 'row',
      paddingVertical: 5,
  },
  socialText: {
      fontSize: 18,
  },
  center: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
  },
});
