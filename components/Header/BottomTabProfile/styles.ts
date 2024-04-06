import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0d0e10',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingTop: 20,
    width: '100%',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
  },
  right: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
})

export default styles
