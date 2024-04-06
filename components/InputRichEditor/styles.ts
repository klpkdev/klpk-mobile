import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  container_input: {
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 10,
  },
  container_icon: {
    width: 25,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#141519',
    color: '#fff',
  },
  label: {
    marginBottom: 12,
    color: '#F1F0F2',
    fontWeight: '500',
  },
  isError: {
    borderColor: '#FF4141',
    borderWidth: 1,
  },
  withoutIcon: {
    paddingLeft: 0,
  },
  toolbar: {
    backgroundColor: '#22242b',
  },
})

export default styles
