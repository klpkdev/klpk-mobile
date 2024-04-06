import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  container_input: {
    backgroundColor: '#141519',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  container_icon: {
    width: 25,
    alignItems: 'center',
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
  select: {
    width: '100%',
  },
  input: {
    width: '100%',
    padding:11,
    paddingHorizontal: 20,
    color:'#fff'
  },
})

export default styles
