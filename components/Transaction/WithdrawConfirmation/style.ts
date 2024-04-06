import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 12,
    margin: 20,
  },
  title: {
    fontWeight: '500',
    color: '#fff',
    marginBottom: 24,
  },
  itemContainer: {
    marginBottom: 12,
  },
  itemLabel: {
    color: '#fff',
    fontWeight: '500',
  },
  itemContent: {
    marginTop: 27,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 14,
    color: '#fff',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#726A64',
  },
  textTotal: {
    fontSize: 14,
    color: '#fff',
  },
  total: {
    gap: 15,
    borderRadius:12,
    backgroundColor: '#141519',
    flexDirection: 'row',
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default styles
