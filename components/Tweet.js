import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import Colors from '../constants/Colors';

export class Tweet extends React.Component {
  render() {
      return (
          <TouchableOpacity onPress={this._handleTweetLink(this.props.tweet['source'])}>
             <Text style={styles.feedPanel}>
                 {this.props.tweet['data']['text']}
             </Text>
          </TouchableOpacity>
      );
  }
  
  _handleTweetLink = (source) => (e) => {
    var link = source.replace('twitter(', '').replace(')', '');
    WebBrowser.openBrowserAsync(link);
  };
}

const styles = StyleSheet.create({
    feedPanel: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'left',
        borderColor: 'rgba(0,0,0,0.07)',
        borderWidth: 1,
        borderRadius: 2,
        padding: 10,
    },
});