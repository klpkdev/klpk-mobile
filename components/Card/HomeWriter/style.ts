import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    margin: 8,
    width: 200,
    marginBottom: 16,
    alignItems: 'center',
    backgroundColor: '#1B1C21',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 27,
    paddingBottom: 70,
  },
  title: {
    fontSize: 12,
    marginTop: 10,
    marginBottom: 18,
    color: '#ADA29A',
  },
  status: {
    flexDirection: 'row',
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 900,
  },
  author: {
    fontSize: 14,
    color: '#F9F7EF',
    marginTop: 40,
  },
  placeholderImage: {
    width: 90,
    height: 90,
    backgroundColor: '#eee',
    borderRadius: 900,
  },
  containerStatus: {
    flexDirection: 'row',
  },
  rating: {
    top: 6,
    left: 6,
    alignItems: 'center',
    zIndex: 1,
    position: 'absolute',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 6,
    gap: 4,
    backgroundColor: 'rgba(249, 247, 239, 0.9)',
  },
  quote: {
    fontSize: 12,
    color: '#ADA29A',
    textAlign: 'center',
  },
})

export default styles
