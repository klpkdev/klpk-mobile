import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    alignItems: 'center',
    marginBottom: 32,
    paddingBottom: 26,
    borderBottomColor: '#1B1C21',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F9F7EF',
  },
  content: {
    flexDirection: 'column',
    flex: 1,
  },
  description: {
    fontSize: 10,
    marginTop: 10,
    color: '#ADA29A',
  },
  image: {
    width: 120,
    height: 150,
    borderRadius: 10,
  },
  author: {
    fontSize: 12,
    color: '#ADA29A',
    marginVertical: 8,
  },
  placeholderImage: {
    width: 120,
    height: 150,
    backgroundColor: '#eee',
    borderRadius: 10,
  },

  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  textRating: {
    fontSize: 12,
    color: '#F9F7EF',
    marginLeft: 6,
  },
  coin: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 8,
    alignItems: 'center',
  },
  textCoin: {
    fontSize: 14,
    color: '#D6B16D',
    fontWeight: '700',
  },
})

export default styles
