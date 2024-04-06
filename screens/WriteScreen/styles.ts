import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingBottom: 50,
    marginTop: 24,
  },
  parent: {
    paddingHorizontal: 10,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonNew: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    borderColor: '#D6B16D',
  },
  buttonNewText: {
    color: '#D6B16D',
    marginLeft: 8,
  },
  title: {
    color: '#D6B16D',
    fontSize: 20,
    fontWeight: '700',
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: '#0D0E10',
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 18,
    paddingHorizontal: 18,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#726A64',
  },
  bottomSheetHeaderTitle: {
    fontWeight: '700',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  bottomSheetActionLeft: {
    width: 100,
  },
  bottomSheetActionRight: {
    width: 100,
    alignItems: 'flex-end',
  },
  handleStyle: {
    backgroundColor: '#0D0E10',
    shadowOpacity: 0,
    borderColor: 'red',
    display: 'none',
  },
  uploadImage: {
    backgroundColor: '#1B1C21',
    borderRadius: 12,
    height: 250,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonUploadImage: {
    borderWidth: 1,
    borderColor: '#D6B16D',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  buttonUploadImageText: {
    color: '#D6B16D',
  },
  containerUpload: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  containerForm: {
    paddingHorizontal: 30,
    paddingBottom: 30,
    flex: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 300,
  },
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
    paddingBottom: 30,
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
  footer: {
    height: 50,
    width: '100%',
  },
  textNext: {
    color: '#fff',
  },
});

export default styles;
