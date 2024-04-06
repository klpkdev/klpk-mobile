import {Dimensions, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 31,
    height: '100%',
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
})

export default styles
