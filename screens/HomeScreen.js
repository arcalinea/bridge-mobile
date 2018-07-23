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
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { Tweet } from '../components/Tweet';

const tweets = [
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
         posts: [],
     }
  }
  
  componentWillMount = async () => {
    try {
        const response = await fetch('http://192.168.0.193:7777/feed/arcalinea')
        const posts = await response.json()

        this.setState({loading: false, posts})
    } catch (e) {
        this.setState({loading: true, error: true})
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
                        : require('../assets/images/robot-prod.png')
                    }
                    style={styles.welcomeImage}
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
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/j-twitter-profile.jpg')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}
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
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }
  
  _renderTweets() {
        return this.state.posts.map(function(tweet, i){
            return (
                <Tweet key={i} tweet={tweet}/>
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
    marginBottom: 20,
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
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  feedContainer: {
    marginHorizontal: 20,
    flex: 1,
    flexDirection: 'column',
    // width: 150,
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
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
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
