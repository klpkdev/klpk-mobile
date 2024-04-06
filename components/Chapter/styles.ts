import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141519',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 13,
    paddingVertical: 20,
    marginBottom: 12,
  },
  number: {
    borderRadius: 300,
    width: 29,
    height: 29,
    borderWidth: 1,
    borderColor: '#D6B16D',
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#D6B16D',
  },
  title: {
    flex: 1,
    fontWeight: '700',
    color: '#D6B16D',
  },
})

export default styles
