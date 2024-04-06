import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D0E10',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  textEmpty: {
    marginTop: 32,
    fontSize: 14,
    color: '#fff',
  },
  item: {
    marginBottom: 20,
    flex: 1,
    borderBottomColor: '#444',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  item_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  item_title: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '700',
  },
  item_date: {
    fontSize: 12,
    color: '#ADA29A',
  },
  footer: {
    height: 100,
  },
});

export default styles;
