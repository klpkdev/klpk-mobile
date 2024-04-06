import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  // Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    backgroundColor: '#141519',
    width: '95%',
    alignItems: 'center',
    borderRadius: 10,
    padding: 30,
  },
  modalTitle: {
    color: '#D6B16D',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 39,
    marginTop: 34,
  },
  modalText: {
    fontSize: 14,
    marginTop: 26,
    marginBottom: 30,
    width: 180,
    textAlign: 'center',
    color: '#fff',
  },
})

export default styles
