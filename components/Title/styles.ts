import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal:12
  },
  left: {
    flexDirection: 'column',
  },
  right: {
    flexDirection: 'row',
  },
  title: {
    color: '#D6B16D',
    marginBottom:8,
    fontWeight: '700',
  },
  subtitle: {
    color: '#AF7F3E',
    fontSize: 12,
  },
  readMoreText: {
    color: '#726A64',
    fontSize: 12,
    marginRight:4
  },
})

export default styles
