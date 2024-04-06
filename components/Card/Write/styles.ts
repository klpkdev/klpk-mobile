import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '30%',
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F9F7EF',
    marginTop: 4,
  },
  status: {
    flexDirection: 'row',
  },
  statusText: {
    marginLeft: 4,
    fontSize: 10,
    color: '#F9F7EF',
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 10,
  },
  description: {
    fontSize: 12,
    color: '#ADA29A',
    marginTop: 8,
    marginBottom: 8,
  },
  placeholderImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  containerStatus: {
    flexDirection: 'row',
  },
})

export default styles
