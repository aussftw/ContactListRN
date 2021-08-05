import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import storage from '@react-native-firebase/storage';

interface Props {
  photoFile: any;
  loading: string | boolean;
  setLoading: (loading: boolean) => void;
  setFireBaseUrl: (url: string) => void;
}

const Uploader = ({loading, photoFile, setLoading, setFireBaseUrl}: Props) => {
  const uploadFile = async (file: any) => {
    setLoading(true);
    const path = 'contact-pictures/user/777/' + photoFile.path;
    const storageRef = storage().ref(path);
    const fileRes = await storageRef.putFile(file.path);
    const link = await storageRef.getDownloadURL();
    setLoading(false);
    setFireBaseUrl(link);
  };

  useEffect(() => {
    uploadFile(photoFile);
    ('uf');
  }, [photoFile]);

  return <View>{loading && <Text>Loading</Text>}</View>;
};

export default Uploader;
