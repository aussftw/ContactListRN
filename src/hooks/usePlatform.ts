import {useState, useEffect} from 'react';
import {Platform} from 'react-native';

export const usePlatform = () => {
  const [os, setOs] = useState(Platform.OS);

  useEffect(() => {
    setOs(Platform.OS);
  }, []);

  return {
    ...Platform,
    isAndroid: Platform.OS !== 'ios',
  };
};
