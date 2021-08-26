import {useState, useEffect} from 'react';
import {Platform} from 'react-native';

export const usePlatform = () => {
  const [os, setOs] = useState<string>(Platform.OS);

  useEffect(() => {
    setOs(Platform.OS);
    //console.log(Platform.select());
  }, []);

  return {
    ...Platform,
    isAndroid: Platform.OS !== 'ios',
  };
};
