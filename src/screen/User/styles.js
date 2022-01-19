import {StyleSheet} from 'react-native';
import {Color} from '../../constants/Color';

export const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Color.shadeBlue,
  },
  inside: {
    flex: 1,
    paddingRight: 10,
    justifyContent: 'center',
  },
  text: screen => ({
    fontSize: screen.onePixel * 40,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingHorizontal: 20,
    color: 'rgba(255, 255, 255, 1);',
    textShadowColor: 'rgba(61, 155, 174, 1);',
    textShadowOffset: {width: -4, height: 2.5},
    textShadowRadius: 10,
    elevation: 10,
  }),
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
  button: {
    paddingTop: 19,
  },
});
