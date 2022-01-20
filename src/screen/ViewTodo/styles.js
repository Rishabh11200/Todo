import {StyleSheet} from 'react-native';
import {Color} from '../../constants/Color';

export const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Color.shadeBlue,
  },
  modalView: {
    justifyContent: 'center',
    margin: 20,
    backgroundColor: Color.white,
    borderRadius: 20,
    padding: 35,
    shadowColor: Color.blue,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 9,
  },
  center: {flex: 1, alignSelf: 'center', width: '90%'},
  inside: {
    flex: 1,
    paddingRight: 10,
    justifyContent: 'center',
  },
  text: {
    color: Color.black,
    fontSize: 18,
    margin: 5,
  },
  title: {
    color: Color.black,
    fontSize: 19,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
  },
});
