import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Button,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

import config from '../../config';

export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      password: '',
    };
  }
  
  static navigationOptions = {
    title: 'Please sign in',
  };
  
  async _handleCreateAccount() {
    console.log("Creating account")
    try {      
      const response = await fetch(config.host + ':7777/feed/arcalinea', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{
          type: 'smor',
          source: '',
          author: '',
          created_at: Math.round(+new Date()/1000),
          data: { text: this.state.text },
          response_to: '',
          signature: '' }
        ])
      })
      console.log("Response status", response.status);
      if (response.status == 200){
        alert("New Post: \n" + this.state.text);
      }
    } catch (e) {
      alert("An error occurred: \n" + e);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginPanel}>
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
          <Button color='rgba(155, 130, 201, 1)' title="Sign in!" onPress={this._signInAsync} />
        </View>
        <View style={styles.actionPanel}>
          <TouchableOpacity onPress={async () => this._handleCreateAccount}>
            <Text style={{textAlign: 'center'}}>Create account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _signInAsync = async () => {
    console.log("Signing In Async: ");
    console.log(this.state.username);
    console.log(this.state.password);
    await AsyncStorage.setItem('userToken', 'abc');
    await AsyncStorage.setItem('username', this.state.username);
    this.props.navigation.navigate('Main');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  loginPanel: {
    margin: 22,
  },
  actionpanel: {
    justifyContent: 'center',
    textAlign: 'center',
  },
})
