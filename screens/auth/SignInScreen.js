import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Button,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  ScrollView,
} from 'react-native';
import { Icon } from 'expo';

import { NewUser } from '../../components/NewUser';

import config from '../../config';

export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      password: ''
    };
  }
  
  static navigationOptions = {
    title: 'Please sign in',
  };
  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Modal 
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}>
            <View style={modalStyles.modalStyle}>
              <View style={modalStyles.tabBarInfoContainer}>
                  <TouchableOpacity onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
                      <View>
                        <Icon.Ionicons name='md-arrow-round-back' style={modalStyles.backArrow}/>
                      </View>
                  </TouchableOpacity>
              </View>
              <ScrollView style={modalStyles.modalScrollPanel}>
                <View>
                  <NewUser/>
                </View>
              </ScrollView>
            </View>
        </Modal>
      
      
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
          <Button color='rgba(155, 130, 201, 1)' title="Sign in" onPress={this._signInAsync} />
        </View>
        <View style={styles.actionPanel}>
          <TouchableOpacity onPress={() => {this.setModalVisible(true);}}>
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
