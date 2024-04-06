import {Dimensions, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D0E10',
    height: '100%',
  },
  header: {
    margin: 20,
    position: 'relative',
    backgroundColor: '#1B1C21',
    borderWidth: 1,
    borderColor: '#0D0E10',
    borderRadius: 10,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
  },
  headerContent: {
    position: 'absolute',
    top: 70,
    left: 30,
  },
  headerBody: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginTop: 14,
  },
  textCoins: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  title: {
    color: '#fff',
  },
  buttonContainer: {
    marginHorizontal: 20,
    backgroundColor: '#1B1C21',
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  textButton: {
    fontSize: 12,
    color: '#ADA29A',
    marginTop: 10,
  },
  divider: {
    height: '100%',
    width: 1,
    backgroundColor: '#141519',
  },
  // History
  historyContainer: {
    margin: 20,
  },
  titleHistory: {
    paddingBottom: 16,
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    marginBottom: 24,
  },
  handleStyle: {
    backgroundColor: '#0D0E10',
    shadowOpacity: 0,
    borderColor: 'red',
    display: 'none',
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: '#0D0E10',
  },
  footer: {
    marginHorizontal: 20,
  },
})

export default styles
