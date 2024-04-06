import {Dimensions, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginTop: 32,
    width: 108,
    marginBottom: 26,
  },
  textBottom: {
    color: '#F9F7EF',
    marginBottom: 37,
  },
  carousel: {
    flex:1
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 100,
    backgroundColor: '#5A5B62',
  },
  containerDot: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  textYellow: {
    color: '#D6B16D',
    fontWeight: '700',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
})

export default styles
