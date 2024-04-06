import {Dimensions, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    padding: 18,
    paddingTop: 42,
    backgroundColor: '#141519',
  },
  header: {
    flexDirection: 'row',
    gap: 24,
  },
  imageProfile: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  placeholderImage: {
    width: 90,
    height: 90,
    borderRadius: 100,
    backgroundColor: '#eee',
  },
  bioContainer: {
    marginTop: 30,
  },
  textBio: {
    fontSize: 12,
    color: '#F9F7EF',
  },
  containerContent: {},
  nameProfile: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  textNameProfile: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F9F7EF',
  },
  username: {
    color: '#ADA29A',
    marginTop: 10,
    marginBottom: 12,
    fontSize: 12,
  },
  containerButton: {
    flexDirection: 'row',
  },
  buttonContainer: {
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
    height: 50,
  },
})

export default styles
