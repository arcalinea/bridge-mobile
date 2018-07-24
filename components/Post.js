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
} from 'react-native';
import { WebBrowser, Icon } from 'expo';
import SocialIcon from '../components/SocialIcon';

import Colors from '../constants/Colors';
import modalStyles from '../assets/styles/modal.js';

export class Post extends React.Component {
    state = {
      modalVisible: false,
    };

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }
  
  render() {    
      var fullText = this.props.post['data']['text'];
      var text = fullText.length > 140 ? fullText.substring(0, 140).split(' ').slice(0, -1).join(' ') + "..." : fullText; 
            
      if (this.props.post['type'] == 'tweet'){
          return (
              <View>
                {this._modalFullPost(fullText)}
                
                <View style={styles.tweetPanel}>
                    <TouchableOpacity onPress={() => {this.setModalVisible(true);}}>
                        <Text style={styles.tweetText}>
                            {text}
                        </Text>
                    </TouchableOpacity>
                </View>
              </View>
          );
      }
      
      if (this.props.post['type'] == 'facebook_post'){
          return (
              <View>
                  {this._modalFullPost(fullText)}
                  
                  <View style={styles.facebookPanel}>
                      <TouchableOpacity onPress={() => {this.setModalVisible(true);}}>
                          <Text style={styles.tweetText}>
                              {text}
                          </Text>
                      </TouchableOpacity>
                  </View>
              </View>
          ); 
      }
  }
  
  _modalFullPost(fullText){    
    return (
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
                <Text>{fullText}</Text>
                
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </ScrollView>
          </View>
      </Modal>
    );
  };
  
  _handleTweetLink = (source) => (e) => {
    var link = source.replace('twitter(', '').replace(')', '');
    WebBrowser.openBrowserAsync(link);
  };
}

const styles = StyleSheet.create({
    tweetPanel: {
      borderColor: 'rgba(0,0,0,0.07)',
      borderWidth: 1,
      borderRadius: 2,
      backgroundColor: '#EFF9FE',
    },
    facebookPanel: {
      borderColor: 'rgba(0,0,0,0.07)',
      borderWidth: 1,
      borderRadius: 2,
      backgroundColor: '#FAEFFE',
    },
    tweetText: {
      fontSize: 16,
      lineHeight: 24,
      textAlign: 'left',
      padding: 10,
    },
});