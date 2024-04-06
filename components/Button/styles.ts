import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 2,
  },
  containerFull: {
    padding: 12,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 2,
  },
  text: {
    textAlign: 'center',
    color: '#1B1C21',
  },
  disabled: {
    borderColor: '#52545c',
    backgroundColor: '#52545c',
  },
  textDisabled: {
    color: '#9598a6',
  },
  yellow: {
    borderColor: '#D6B16D',
    backgroundColor: '#D6B16D',
  },
  black: {
    borderColor: '#1B1C21',
    backgroundColor: '#1B1C21',
  },
  grey: {
    borderColor: '#726A64',
    backgroundColor: '#726A64',
  },
  red: {
    borderColor: '#FF4141',
    backgroundColor: '#FF4141',
  },
  blue: {
    borderColor: '#0A84FF',
    backgroundColor: '#0A84FF',
  },
  outline: {
    backgroundColor: 'transparent',
  },
  textOutlineyellow: {
    color: '#D6B16D',
  },
  textOutlineblack: {
    color: '#1B1C21',
  },
  textOutlinegrey: {
    color: '#726A64',
  },
})

export default styles
