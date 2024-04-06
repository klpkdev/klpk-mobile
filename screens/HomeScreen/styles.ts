import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D0E10',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    width: 300,
  },
  header: {
    width: '100%',
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
  },
  carousel: {
    marginBottom: 20,
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
  footer: {
    height: 50,
    width: '100%',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  inputSearch: {
    marginHorizontal: 12,
  },
})

export default styles
