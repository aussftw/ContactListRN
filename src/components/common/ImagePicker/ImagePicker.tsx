import React, {ReactElement, ReactNode, forwardRef} from 'react';
import {Icon} from '..';
import {Box, Text} from '../../..';
import RBSheet from 'react-native-raw-bottom-sheet';
import {TouchableOpacity, Platform} from 'react-native';
import ImagePickerCropper from 'react-native-image-crop-picker';

interface Props {
  children?: ReactElement | ReactNode;
  onFileSelected: (image: any) => void;
}

const ImagePicker = forwardRef(({onFileSelected}: Props, ref) => {
  const options = [
    {
      name: 'Take from camera',
      icon: <Icon type="AntDesignIcon" size={34} name="camerao" color="grey" />,
      onPress: () => {
        ImagePickerCropper.openCamera({
          width: 300,
          height: 300,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then(image => {
            onFileSelected(image);
          })
          .catch(err => {
            console.log(err, 'camera  error');
          });
      },
    },
    {
      name: 'Chose form Gallery',
      icon: <Icon type="AntDesignIcon" name="picture" size={35} color="grey" />,
      onPress: () => {
        ImagePickerCropper.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then(image => {
            onFileSelected(image);
          })
          .catch(err => {
            console.log(err, 'gallery image error');
          });
      },
    },
  ];

  const container =
    Platform.OS === 'ios'
      ? {borderTopRightRadius: 20, borderTopLeftRadius: 20}
      : {};

  return (
    <RBSheet
      ref={ref}
      height={200}
      openDuration={250}
      customStyles={{
        container,
      }}
      dragFromTopOnly
      closeOnDragDown>
      <Box>
        <Box marginTop="m" marginHorizontal="m">
          {options.map(({name, onPress, icon}) => (
            <TouchableOpacity onPress={onPress} key={name}>
              <Box flexDirection="row" marginVertical="s">
                <Box alignItems="center" marginRight="l">
                  {icon}
                </Box>
                <Text variant="nav" color="darkGrey">
                  {name}
                </Text>
              </Box>
            </TouchableOpacity>
          ))}
        </Box>
      </Box>
    </RBSheet>
  );
});

export default ImagePicker;
