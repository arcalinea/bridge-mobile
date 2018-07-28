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
  
  // createKeys(){
  //   console.log("Creating keypair")
  //   var keys = nacl.box.keyPair();
  //   console.log("keys", keys)
  //   return keys
  // }
  
  async _handleCreateAccount() {
    console.log("Creating keypair") // do this with more randomness
    var seed = new Uint8Array(32);
    seed[3] = 5;
    var keys = nacl.sign.keyPair.fromSeed(seed);
    console.log("keys", keys)
    // save the secretkey locally
    // const randNonce = randomBytes(32);
    
    // var smkey = stringToUint8Array(password); // must be 32 bytes, pad it if you have to
    // var smKey = [];
    // var buffer = new Buffer(password, 'utf16le');
    // for (var i = 0; i < buffer.length; i++) {
    //     smKey.push(buffer[i]);
    // }
    // // var nonce = nacl.randomBytes(nacl.box.nonceLength);
    // var encryptedSecretKey = nacl.secretbox(secretKey, randNonce, smKey);
    
    // super insecure, do not do this for real
    // await AsyncStorage.setItem('privkey', keys.secretKey);

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