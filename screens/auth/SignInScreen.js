import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Button,
  View,
  TextInput,
} from 'react-native';

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
          <Button title="Sign in!" onPress={this._signInAsync} />
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
})
