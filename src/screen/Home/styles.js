import {StyleSheet} from 'react-native';
import {Color} from '../../constants/Color';

export const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Color.white,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  space: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
  },
  listView: {
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 1,
    backgroundColor: '#333333',
  },
  listTitle: {
    color: Color.white,
    fontSize: 18,
    fontStyle: 'italic',
    textTransform: 'capitalize',
  },
  listDescriptionText: {
    color: Color.white,
    fontSize: 16,
    marginLeft: 10,
  },
  insideList: {
    flex: 1,
    marginLeft: 20,
  },
  icon: {
    margin: 5,
  },
});
