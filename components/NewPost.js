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
} from 'react-native';
import { WebBrowser, Icon } from 'expo';

export class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };
  }
  
  async _handlePost() {
    try {      
      const response = await fetch('http://192.168.0.104:7777/feed/arcalinea', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{
          type: 'tweet',
          source: 'twitter(https://twitter.com/arcalinea/status/977322529508425728)',
          author: '',
          created_at: Math.round(+new Date()/1000),
          data: { text: this.state.text },
          response_to: 'twitter(https://twitter.com/decentralion/status/977316726093234177)',
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
  };

  render(){
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Create a Post</Text>
          <View style={styles.input}>
              <TextInput
                style={{height: 60, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10}}
                onChangeText={(text) => this.setState({text})}
                placeholder="Useless Placeholder"
              />
              <Button title="Post" onPress={async () => this._handlePost()} />
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