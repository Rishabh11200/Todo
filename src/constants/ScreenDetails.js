import {useState, useEffect} from 'react';
import {Dimensions, Platform} from 'react-native';

export default function ScreenDetails() {
  const [screen, setScreen] = useState(Dimensions.get('screen'));
  useEffect(() => {
    const onChangeValue = answer => {
      setScreen(answer.screen);
    };
    const event = Dimensions.addEventListener('change', onChangeValue);
    return () => event.remove();
  }, []);
  let potrait = screen.height > screen.width;
  let onePixel = screen.width * 0.00113 + screen.height * 0.00051;
  if (screen.height < screen.width) {
    onePixel = onePixel * 0.7;
  }
  const ScreenDetails = {
    platform: Platform.OS,
    height: screen.height,
    width: screen.width,
    up: potrait,
    onePixel: onePixel,
  };
  return ScreenDetails;
}
