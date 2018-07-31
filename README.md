# bridge-mobile

Mobile app for bridging social networks, focused on interoperability and user control.

This is demo* code to test the hypothesis that it is possible to build a mobile social app that: 

- has a familiar user experience
- aggregates data from different platforms
- authenticates identity from different platforms
- uses a mutable data structure optimized for decentralized networks, that makes it easy to import and modify posts
- connects to server for convenience, but can publish posts p2p through a decentralized data store

See bridge-serve for backend code and data structure rationale.

_*Experimental, work-in-progress, totally unusable right now._

Would be nice to have: 

- User-configurable curation for feeds; algorithmic transparency
- Highly customizable user interface over common data structure

# Running 

Test with [Expo](https://expo.io/)

```
exp start
```

Add a config file with the following (user state is not being persisted through app, so this is a hack): 

```
const config = {
    host: {ip and port where expo is running},
    username: {your username},
    profile_pic: 'assets/images/{your profile pic}'
};

module.exports = config;
```

Put a profile pic in `assets/images/`, and add dummy post data to fall back on for UI development when bridge-serve connection is down in a file called `assets/posts.js`.
