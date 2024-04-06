import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  itemHistory: {
    flexDirection: 'row',
    gap: 26,
    marginBottom: 10,
    paddingHorizontal: 25,
    paddingVertical: 18,
    backgroundColor: '#1B1C21',
    borderRadius: 8,
  },
  itemHistoryContent: {
    flexDirection: 'column',
    gap: 10,
  },
  titleItemHistory: {
    fontWeight: '700',
    fontSize: 14,
    color: '#fff',
  },
  dateItemHistory: {
    color: '#ADA29A',
    fontSize: 12,
  },
})

export default styles
