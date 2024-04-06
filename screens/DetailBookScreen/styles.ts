import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingTop: 8,
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#726A64',
    paddingBottom: 30,
  },
  title: {
    marginTop: 14,
    marginBottom: 12,
    maxWidth: 300,
    textAlign: 'center',
    color: '#F9F7EF',
    fontWeight: '700',
    fontSize: 20,
  },
  author: {
    fontSize: 12,
    color: '#ADA29A',
    marginBottom: 24,
  },
  meta: {
    flexDirection: 'row',
    gap: 16,
  },
  iconText: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  iconText_Text: {
    fontSize: 12,
    color: '#F9F7EF',
  },
  buttonBottom: {
    position: 'absolute',
    bottom: 16,
    backgroundColor: '#D6B16D',
    width: 147,
    left: Dimensions.get('screen').width / 2 - 73.5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 8,
    borderRadius: 10,
  },
  textButtonBottom: {
    color: '#1B1C21',
  },
  // ButtonGroup
  buttonGroup: {
    marginTop: 17,
    marginBottom: 23,
    backgroundColor: '#0D0E10',
    marginHorizontal: 58,
    borderRadius: 10,
    padding: 2,
    flexDirection: 'row',
  },
  buttonGroupButton: {
    borderRadius: 10,
    width: 124,
    flex: 1,
  },
  buttonGroupButtonActive: {
    backgroundColor: '#141519',
  },
  buttonGroupButtonText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 12,
  },
  // content
  containerContent: {
    marginHorizontal: 20,
    marginBottom: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#726A64',
  },
  titleSynopsis: {
    color: '#D6B16D',
    fontWeight: '700',
    marginBottom: 16,
  },
  content: {
    fontSize: 12,
    color: '#F9F7EF',
  },
  // Rating
  containerRating: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#726A64',
  },
  titleRating: {
    fontSize: 12,
    marginBottom: 22,
  },
  // Content Meta
  contentMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
  },
  itemMeta: {
    width: '50%',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  itemMetaContent: {
    flexDirection: 'column',
  },
  itemMetaTitle: {
    color: '#726A64',
    fontSize: 12,
  },
  itemMetaDesc: {
    color: '#D6B16D',
    fontSize: 12,
  },
  chapterList: {
    marginBottom: 100,
    marginHorizontal: 20,
    backgroundColor: '#1B1C21',
    paddingVertical: 22,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  chapterListTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 25,
    color: '#D6B16D',
  },
  image: {
    width: 150,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  buttonReview: {
    backgroundColor: '#D6B16D',
    width: 147,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 8,
    borderRadius: 10,
    marginBottom:7
  },
  inputReviewContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 20,
    marginLeft: 15,
    // justifyContent:'flex-start',
    // alignItems:'flex-start',
    backgroundColor: '#444',
    padding: 10,
    width: '80%',
    flex: 1,
    color: '#fff',
  },
  inputReview: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    minHeight: 100,
    backgroundColor: '#444',
    textAlignVertical: 'top',
    color: '#fff'
  },
});

export default styles;
