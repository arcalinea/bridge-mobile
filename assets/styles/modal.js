import { StyleSheet, Platform } from 'react-native';

export default modalStyles = StyleSheet.create({
  modalStyle: {
    backgroundColor: 'rgba(255, 255, 255, 1)', 
    width: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  modalScrollPanel: {
    marginTop: 60,
    margin: 22,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    top: 0,
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
        elevation: 10,
      },
    }),
    alignItems: 'flex-start',
    backgroundColor: '#fbfbfb',
    paddingVertical: 10,
    height: 45,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  backArrow: {
    fontSize: 27,
    paddingHorizontal: 10,
  }
})