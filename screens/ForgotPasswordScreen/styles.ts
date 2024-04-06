import {Dimensions, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 31,
    height: '100%',
  },
  title: {
    color: '#D6B16D',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 88,
    marginBottom: 48,
  },
  link: {
    color: '#D6B16D',
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  bgimage: {
    width: Dimensions.get('window').width, //for full screen
    height: Dimensions.get('window').height, //for full screen
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  forgot: {
    marginTop: 10,
    marginBottom: 30,
    alignItems: 'flex-end',
    width: '100%',
  },
  forgot_text: {
    color: '#5A5B62',
  },
})

export default styles
