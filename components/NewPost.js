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
    this.state = { text: 'Write here' };
  }
  
  async _handlePost() {
    try {      
      const response = await fetch('http://192.168.0.23:7777/feed/arcalinea', {
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
                placeholder="Write here"
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