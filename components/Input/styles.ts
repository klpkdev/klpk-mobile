import {StyleSheet} from 'react-native';

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
    paddingLeft: 16,
  },
  container_icon: {
    width: 25,
    alignItems: 'center',
  },
  input: {
    height: 40,
    marginHorizontal: 12,
    padding: 10,
    color: '#D6B16D',
    flex: 1,
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
});

export default styles;
