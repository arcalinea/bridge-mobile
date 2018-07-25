import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
    this.state = {
      username: '',
    }
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    console.log("\nIn AuthLoadingScreen:");
    const userToken = await AsyncStorage.getItem('userToken');
    const username = await AsyncStorage.getItem('username');
    console.log("Found user token: ", userToken);
    console.log("Found username: ", username);
    this.setState({username: username});
    
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'Main' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View >
        <Text>Loading</Text>
      </View>
    );
  }
}

// <ActivityIndicator />
// <StatusBar barStyle="default" />

