import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    margin: 8,
    width: 120,
    marginBottom: 16,
    position: 'relative',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F9F7EF',
  },
  status: {
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 10,
  },
  author: {
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
  textRating: {
    fontSize: 12,
    color: '#AF7F3E',
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
  containerProgress: {
    marginTop: -30,
    backgroundColor: 'blue',
    marginBottom: 20,
    width: '80%',
    marginLeft: '10%',
    borderRadius: 2,
    overflow: 'hidden',
  },
  textProgress: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
  },
  containerProgressBar: {
    width: '100%',
    backgroundColor: '#fff',
    height: 2,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: -25,
  },
  progressBar: {
    height: 2,
    backgroundColor: '#0A84FF',
  },
});

export default styles;
