import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  itemTransaction: {
    flexDirection: 'row',
    gap: 26,
    paddingHorizontal: 25,
    paddingVertical: 18,
    backgroundColor: '#1B1C21',
    borderRadius: 8,
  },
  itemTransactionSelected: {
    backgroundColor: '#D6B16D',
  },
  itemTransactionContent: {
    flexDirection: 'column',
  },
  titleItemTransaction: {
    fontWeight: '700',
    fontSize: 20,
    color: '#D6B16D',
  },
  dateItemTransaction: {
    color: '#fff',
    fontSize: 14,
  },
  titleItemTransactionSelected: {
    color: '#fff',
  },
})

export default styles
