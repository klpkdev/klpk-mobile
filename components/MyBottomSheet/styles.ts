import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
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
  bottomSheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 18,
    paddingHorizontal: 18,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#726A64',
  },
  bottomSheetHeaderTitle: {
    fontWeight: '700',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  bottomSheetActionLeft: {
    width: 100,
  },
  bottomSheetActionRight: {
    width: 100,
    alignItems: 'flex-end',
  },
})

export default styles
