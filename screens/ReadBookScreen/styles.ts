import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D0E10',
    height: '100%',
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  footer: {
    height: 100,
    width: '100%',
  },
  buttonBottom: {
    marginTop: 20,
  },
  imageLock: {
    width: 274,
    height: 203,
  },
  lockContainer: {
    backgroundColor: '#0D0E10',
    height: '100%',
    paddingTop: 90,
    alignItems: 'center',
  },
  titleLock: {
    color: '#F9F7EF',
    marginBottom: 54,
    fontSize: 20,
    fontWeight: '700',
  },
  coinTextContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginTop: 40,
  },
  coinText: {
    fontSize: 14,
    color: '#fff',
  },
  buttonBuyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginTop: 40,
  },
  setting: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    color: '#fff',
  },
  footerBootomSheet: {
    marginHorizontal: 20,
  },
})

export default styles
