import {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';

export const useScreen = () => {
  const [screenInfo, setScreenInfo] = useState(Dimensions.get('screen'));

  useEffect(() => {
    const onChange = (result: any) => {
      setScreenInfo(result.screen);
    };

    Dimensions.addEventListener('change', onChange);

    return () => Dimensions.removeEventListener('change', onChange);
  }, []);

  return {
    ...screenInfo,
    isSmallDevice: screenInfo.height < 600 || screenInfo.width < 375,
    isPortrait: screenInfo.height > screenInfo.width,
  };
};
