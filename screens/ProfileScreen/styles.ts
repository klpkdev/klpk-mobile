import {Dimensions, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: '#141519',
  },
  headerCover: {
    width: '100%',
    height: 125,
    resizeMode: 'cover',
  },
  imageProfile: {
    width: 90,
    height: 90,
    borderRadius: 100,
    marginTop: -45,
    marginLeft: Dimensions.get('screen').width / 2 - 45,
  },
  placeholderImage: {
    width: 90,
    height: 90,
    borderRadius: 100,
    marginTop: -45,
    marginLeft: Dimensions.get('screen').width / 2 - 45,
    backgroundColor: '#eee',
  },
  placeholderImageCover: {
    width: '100%',
    height: 125,
    backgroundColor: '#aaa',
  },
  containerContent: {
    marginTop: 22,
    alignItems: 'center',
    width: '100%',
  },
  nameProfile: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  textNameProfile: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F9F7EF',
  },
  username: {
    color: '#ADA29A',
    marginTop: 14,
    marginBottom: 12,
    fontSize: 12,
  },
  containerButton: {
    flexDirection: 'row',
  },
  buttonContainer: {
    marginHorizontal: 20,
    backgroundColor: '#1B1C21',
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 24,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  textButton: {
    fontSize: 12,
    color: '#ADA29A',
    marginTop: 4,
  },
  textCount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F9F7EF',
  },
  divider: {
    height: '100%',
    width: 1,
    backgroundColor: '#141519',
  },
  containerTitleRead: {
    marginHorizontal: 20,
    marginTop: 32,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1B1C21',
  },
  titleRead: {
    color: '#F9F7EF',
    fontSize: 20,
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
    paddingTop: 30,
  },
  columnWrapper: {paddingHorizontal: 18},
})

export default styles
