import {Dimensions, StyleSheet} from 'react-native'
const screenDimensions = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0E10',
  },
  backgroundImage: {
    height: screenDimensions.height,
    width: '100%',
    resizeMode: 'cover',
  },
})

export default styles
