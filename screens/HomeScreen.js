import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Modal,
  TouchableHighlight,
  AsyncStorage,
  Button,
} from 'react-native';
import { WebBrowser, Icon } from 'expo';

import { MonoText } from '../components/StyledText';
import { Post } from '../components/Post';
import { NewPost } from '../components/NewPost';

import dataFile from '../assets/posts.js';
import modalStyles from '../assets/styles/modal.js';

import config from '../config';

const postData = [
    {
    type: 'tweet',
    source: 'twitter(https://twitter.com/arcalinea/status/977322529508425728)',
    author: '',
    created_at: '2018-03-23 23:13:43 +0000',
    data: { text: '@dandelionmane @pandoras_foxo Oooh nice' },
    response_to: 'twitter(https://twitter.com/decentralion/status/977316726093234177)',
    signature: '' },
    {
    type: 'tweet',
    source: 'twitter(https://twitter.com/arcalinea/status/987349217566846976)',
    author: '',
    created_at: '2018-04-20 15:16:12 +0000',
    data: { text: 'RT @remyers_: If you are interested in a sober review of incentivized mesh networking projects, please check out the review @arcalinea and…' },
    response_to: '',
    signature: '' },
    {
    type: 'tweet',
    source: 'twitter(https://twitter.com/arcalinea/status/977253119070539782)',
    author: '',
    created_at: '2018-03-23 18:37:54 +0000',
    data: { text: '@SarahGPerry @patrickod This is magical' },
    response_to: 'twitter(https://twitter.com/SarahGPerry/status/976953197108563968)',
    signature: '' },
    {
    type: 'tweet',
    source: 'twitter(https://twitter.com/arcalinea/status/977322529508425728)',
    author: '',
    created_at: '2018-03-23 23:13:43 +0000',
    data: { text: 'yay another tweet' },
    response_to: 'twitter(https://twitter.com/decentralion/status/977316726093234177)',
    signature: '' },
    {
    type: 'tweet',
    source: 'twitter(https://twitter.com/arcalinea/status/976877284694085632)',
    author: '',
    created_at: '2018-03-22 17:44:28 +0000',
    data: { text: 'RT @fchollet: We’re looking at a powerful entity that builds fine-grained psychological profiles of over two billion humans, that runs larg…' },
    response_to: '',
    signature: '' },
    {
    type: 'tweet',
    source: 'twitter(https://twitter.com/arcalinea/status/976877102296379394)',
    author: '',
    created_at: '2018-03-22 17:43:45 +0000',
    data: { text: 'RT @fchollet: The problem with Facebook is not *just* the loss of your privacy and the fact that it can be used as a totalitarian panoptico…' },
    response_to: '',
    signature: '' },
    {
    type: 'facebook_post',
    source: 'facebook(https://www.facebook.com/jlantian)',
    author: '',
    created_at: '2018-05-20 17:43:45 +0000',
    data: { text: 'Test post, the Facebook API is terrible.' },
    response_to: '',
    signature: '' }
]

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  constructor (props) {
     super(props)
     this.state = {
         loading: true,
         error: false,
         posts: postData,
         modalVisible: false,
         user: '',
     }
  }
  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  
  componentWillMount = async () => {
    const username = await AsyncStorage.getItem('username');
    this.setState({username: username});
    try {
        const response = await fetch(config.host + ':7777/feed/arcalinea')
        const posts = await response.json()

        this.setState({loading: false, posts})
    } catch (e) {
        if (__DEV__){
            console.log("In dev mode, using hardcoded tweets")
            this.setState({loading: false, error: false, posts: postData})
        } else {
            this.setState({loading: true, error: true})
        }
    }
  }

  render() {
    const {posts, loading, error} = this.state
       
    if (loading) {
      return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={styles.welcomeContainer}>
                  <Image
                    source={
                      __DEV__
                        ? require('../assets/images/j-twitter-profile.jpg')
                        : require('../assets/images/j-twitter-profile.jpg')
                    }
                    style={styles.profileImage}
                  />
                </View>
            
                <View style={styles.center}>
                  <ActivityIndicator animating={true} />
                </View>
            </ScrollView>
        </View>
      )
    }

    if (error) {
        return (
          <View style={styles.center}>
            <Text>
              Failed to load posts!
            </Text>
          </View>
        )
    }
    
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
                  <NewPost/>
                </View>
              </ScrollView>
            </View>
        </Modal>
      
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/j-twitter-profile.jpg')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.profileImage}
            />
            <Text style={styles.username}>{this.state.username}</Text>
          </View>
                    
          <View style={styles.feedContainer}>
            {this._renderTweets()}
          </View>

        </ScrollView>
        
        <TouchableOpacity style={styles.newPostButton} onPress={() => {this.setModalVisible(true);}}>
          <Icon.Ionicons name='md-create' style={styles.createIcon}/>
        </TouchableOpacity>

      </View>
    );
  }

  // <View>
  //   <Icon.Ionicons name='md-create' style={styles.createIcon}/>
  // </View>
  // <Text style={styles.createText}>New</Text>
  
  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode: {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode.
        </Text>
      );
    }
  }
  
  _renderTweets() {
        return this.state.posts.reverse().map(function(post, i){
            return (
                <Post key={i} post={post}/>
            );
        })
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 5,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
  },
  profileImage: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  username: {
    fontSize: 27,
    paddingRight: 10,
  },
  newPostButton: {
    backgroundColor: 'rgba(155, 130, 201, 1)',
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  createIcon: {
    color: '#fff',
    fontSize: 27,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  createText: {
    fontSize: 22,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  feedContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
