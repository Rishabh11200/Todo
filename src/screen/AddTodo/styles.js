import {StyleSheet} from 'react-native';
import {Color} from '../../constants/Color';

export const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Color.shadeBlue,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingHorizontal: 20,
    color: 'rgba(0, 0, 0, 1);',
    textShadowColor: 'rgba(61, 155, 174, 1);',
    textShadowOffset: {width: -4, height: 2.5},
    textShadowRadius: 10,
    elevation: 10,
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
  centerButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    backgroundColor: Color.cyan,
    marginTop: 10,
    width: '70%',
  },
  insideSubmitText: {
    color: Color.white,
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
