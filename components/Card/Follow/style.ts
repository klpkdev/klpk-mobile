import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 23,
    marginHorizontal:20,
    alignItems:'center'
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightContent: {
    alignItems:'center',
    justifyContent:'flex-end',
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 100,
    marginRight: 23,
  },
  placeholderImage: {
    width: 55,
    height: 55,
    backgroundColor: '#eee',
    borderRadius: 100,
  },
  textName: {
    color: '#F9F7EF',
    fontSize: 14,
    fontWeight: '700',
  },
  button:{
    marginBottom:0
  }
})

export default styles
