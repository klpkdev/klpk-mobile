import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0d0e10',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingTop: 20,
    width: '100%',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  left: {
    width: 50,
    alignItems: 'flex-start',
  },
  right: {
    width: 50,
    alignItems: 'flex-end',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  overlayTop: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 11,
    backgroundColor: 'rgba(10,10,10,0.5)',
  },
  contentChapter: {
    width: 200,
  },
  itemChapter: {
    backgroundColor: '#0D0E10',
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginBottom: 5,
  },
  itemChapterText: {
    color: '#F9F7EF',
  },
})

export default styles
