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
import config from '../config';

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

      if (this.props.post['type'] == 'smor'){
          return (
              <View>
                {this._modalFullPost(fullText)}
                <View style={styles.tweetPanel}>
                    <SocialIcon color='rgba(155, 130, 201, 1)' name={Platform.OS === 'ios' ? `ios-bonfire${focused ? '' : '-outline'}` : 'md-bonfire'}/>
                    <TouchableOpacity style={styles.postBox} onPress={() => {this.setModalVisible(true);}}>
                        <Text style={styles.postText}>
                            {text}
                        </Text>
                    </TouchableOpacity>
                </View>
              </View>
          );
      }
            
      if (this.props.post['type'] == 'tweet'){
          return (
              <View>
                {this._modalFullPost(fullText)}
                <View style={styles.tweetPanel}>
                    <SocialIcon color='#1da1f2' name={Platform.OS === 'ios' ? `ios-logo-twitter${focused ? '' : '-outline'}` : 'logo-twitter'}/>
                    <TouchableOpacity style={styles.postBox} onPress={() => {this.setModalVisible(true);}}>
                        <Text style={styles.postText}>
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
                      <SocialIcon color='#1da1f2' name={Platform.OS === 'ios' ? `ios-logo-facebook${focused ? '' : '-outline'}` : 'logo-facebook'}/>
                      <TouchableOpacity style={styles.postBox} onPress={() => {this.setModalVisible(true);}}>
                          <Text style={styles.postText}>
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
                <Text style={{fontSize: 27}}>{this.props.post['type']}</Text>
                
                <Text style={styles.fullViewText}>{fullText}</Text>
                
                <View>
                  <Text style={styles.fullViewDate}>{timeConverter(this.props.post['created_at'])}</Text>
                  
                  <TouchableOpacity onPress={this._handleTweetLink(this.props.post['source'])}>
                    <Text style={styles.fullViewLink}>View original</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity onPress={async () => this._handleDeletion(this.props.post)}>
                    <Text style={styles.fullViewLink}>Delete Post</Text>
                  </TouchableOpacity>
                </View>
                
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
  
  async _handleDeletion(post) {
    try {      
      const response = await fetch(config.host + ':7777/post/' + config.username + "/" + post['created_at'], {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      console.log("Response status", response.status);
      if (response.status == 200){
        alert("Post deleted");
      }
    } catch (e) {
      alert("An error occurred: \n" + e);
    }
  }
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var period = (hour >= 12) ? 'pm' : 'am';
  hour = (hour > 12)? hour -12 : hour;
  hour = (hour == '00')? 12 : hour;
  var min = a.getMinutes();
  min = (min < 10) ? '0'+min : min;
  var time = hour + ':' + min + ' ' + period + ' ~ ' + date + ' ' + month + ' ' + year;
  return time;
}


const styles = StyleSheet.create({
    tweetPanel: {
      flex: 1,
      flexDirection: 'row',
      borderColor: 'rgba(0,0,0,0.07)',
      borderWidth: 1,
      borderRadius: 2,
      padding: 5,
    },
    facebookPanel: {
      flex: 1,
      flexDirection: 'row',
      borderColor: 'rgba(0,0,0,0.07)',
      borderWidth: 1,
      borderRadius: 2,
      padding: 5,
    },
    postBox: {
      width: '90%',
    },
    postText: {
      fontSize: 16,
      lineHeight: 24,
      textAlign: 'left',
      paddingLeft: 3,
    },
    fullViewText: {
      fontSize: 18,
      paddingVertical: 10,
    },
    fullViewDate: {
      fontSize: 16,
      paddingVertical: 5,
      color: '#5c5c5c',
    },
    fullViewLink: {
      color: 'rgba(155, 130, 201, 1)',
      fontSize: 16,
      paddingVertical: 5,
    },
});