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

import posts from '../assets/posts'
import modalStyles from '../assets/styles/modal.js';

import config from '../config';

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
        // TODO: Store user info in global state
        const response = await fetch(config.host + ':7777/feed/' + config.username)
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
                        ? require('../assets/images/profile.jpg')
                        : require('../assets/images/profile.jpg')
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
                  ? require('../assets/images/profile.jpg') // TODO: Fix image paths
                  : require('../assets/images/profile.jpg') 
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
