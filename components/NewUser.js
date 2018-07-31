import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ScrollView,
  Platform,
  Modal,
  Button,
  Container,
  Content,
  TextInput,
  AsyncStorage,
} from 'react-native';
import { WebBrowser, Icon } from 'expo';
import nacl from 'tweetnacl';

import { ToHexString } from '../utils';

import config from '../config';

export class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      password: ''
   };
  }
  
  toHexString = bytes =>
    bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
  
  async _handleCreateAccount() {
    // this is terrible, find a key management solution
    console.log("Creating keypair") 
    var seed = new Uint8Array(32); 
    var keys = nacl.sign.keyPair.fromSeed(seed);
    console.log("keys", keys)
    // will throw away the privkey and only send public key to server for this demo 
    
    console.log("Creating account")
    try {      
      const response = await fetch(config.host + ':7777/user/new', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          pubkey: ToHexString(keys.publicKey),
          created_at: Math.round(+new Date()/1000)
         }
       )
      })
      console.log("Response status", response.status);
      if (response.status == 200){
        alert("New User created: \n" + this.state.username);
      }
    } catch (e) {
      alert("An error occurred: \n" + e);
    }
  }


  render(){
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Create an Account</Text>
          <View style={styles.input}>
              <TextInput
                style={{height: 60, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10}}
                onChangeText={(username) => this.setState({username})}
                placeholder="Username"
              />
              <TextInput
                style={{height: 60, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10}}
                onChangeText={(password) => this.setState({password})}
                placeholder="Password"
              />
              <TextInput
                style={{height: 60, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10}}
                onChangeText={(password) => this.setState({password})}
                placeholder="Confirm password"
              />
              <Button color='rgba(155, 130, 201, 1)' title="Register" onPress={async () => this._handleCreateAccount()} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 75,
  },
  input: {
    margin: 15,
    flex: 1,
  },
  button: {
    alignSelf: 'flex-end',
    margin: 20,
  },
  title: {
    fontSize: 30,
    color: 'black',
    alignSelf: 'center',
  }
});