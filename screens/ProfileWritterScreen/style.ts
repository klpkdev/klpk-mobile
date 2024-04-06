import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D0E10',
    height: '100%',
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
  header: {
    flexDirection: 'row',
    gap: 25,
    marginHorizontal: 18,
    marginTop: 40,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 900,
  },
  headerContent: {},
  description: {
    marginTop: 28,
    marginHorizontal: 18,
    color: '#F9F7EF',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F9F7EF',
  },
  title: {
    marginVertical: 12,
    color: '#ADA29A',
  },
  buttonFollow: {
    paddingVertical: 5,
    paddingHorizontal: 60,
  },
})

export default styles
