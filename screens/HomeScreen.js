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
} from 'react-native';
import { WebBrowser, Icon } from 'expo';

import { MonoText } from '../components/StyledText';
import { Post } from '../components/Post';
import { NewPost } from '../components/NewPost';

import dataFile from '../assets/posts.js';
import modalStyles from '../assets/styles/modal.js';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  constructor (props) {
     super(props)
     this.state = {
         loading: true,
         error: false,
         posts: [],
         modalVisible: false,
     }
  }
  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  
  componentWillMount = async () => {
    try {
        const response = await fetch('http://192.168.0.104:7777/feed/arcalinea')
        const posts = await response.json()

        this.setState({loading: false, posts})
    } catch (e) {
        if (__DEV__){
            console.log("In dev mode, using hardcoded tweets")
            this.setState({loading: false, error: false, posts: dataFile.posts})
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
            <TouchableOpacity style={styles.newPostButton} onPress={() => {this.setModalVisible(true);}}>
                <View>
                  <Icon.Ionicons name='md-create' style={styles.createIcon}/>
                </View>
                <Text style={styles.createText}>New</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.feedContainer}>
            {this._renderTweets()}
          </View>

        </ScrollView>

      </View>
    );
  }

  
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
        return this.state.posts.map(function(post, i){
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
  newPostButton: {
    flex: 1,
    flexDirection: 'row',
  },
  createIcon: {
    fontSize: 27,
    paddingRight: 10,
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
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
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
