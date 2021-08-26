import React, {useState, useEffect, FC} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {Box, Text} from '../../theme';
import {IContact} from '../../types/contact';
import CreateContactSchema from './CreateContactValidation';
import {yupResolver} from '@hookform/resolvers/yup';
import {DEFAULT_IMAGE_URI} from '../../constants/imageUri';
import {Image, TouchableOpacity} from 'react-native';
import {createContact} from '../../redux/actions/contactsActions';
import {editContact} from '../../redux/actions/contactsActions';
import {useDispatch, useSelector} from 'react-redux';
import {appStateType} from '../../redux/store';
import {useNavigation, useRoute} from '@react-navigation/core';
import storage from '@react-native-firebase/storage';
import {CONTACT_LIST, CONTACT_DETAILS} from '../../constants/routeNames';

import {
  Container,
  Input,
  Button,
  Switch,
  CountryPicker,
  ImagePicker,
} from '../common';

interface ICreateContactView {
  sheetRef?: any;
  closeSheet?: any;
  openSheet?: any;
}

interface ICodeInfo {
  code: string;
  dial_code: string;
  name: string;
}

const CreateContactView: FC<ICreateContactView> = ({
  sheetRef,
  closeSheet,
  openSheet,
}: ICreateContactView) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {params} = useRoute();
  const loading = useSelector((state: appStateType) => state.contacts.loading);

  const [code, setCode] = useState<ICodeInfo>({
    code: '',
    dial_code: '+38',
    name: '',
  });

  const [photoFile, setPhotoFile] = useState({});
  const [uploading, setUploading] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: {errors},
    setValue,
  } = useForm({resolver: yupResolver(CreateContactSchema)});

  useEffect(() => {
    if (params?.contact) {
      navigation.setOptions({title: 'Update contact'});
      setValue('first_name', params.contact.first_name);
      setValue('last_name', params.contact.last_name);
      setValue('phone_number', params.contact.phone_number);
      setValue('id', params.contact.id);
      setValue('is_favorite', params.contact.is_favorite);
      setCode({dial_code: params.contact.country_code});
    }
  }, []);

  const onSubmit: SubmitHandler<IContact> = (data: IContact) => {
    const uploadFile = async (file: any) => {
      const path = 'c/u/7/' + new Date();
      const storageRef = storage().ref(path);
      const fileRes = await storageRef.putFile(file.path);
      const link = storageRef.getDownloadURL();
      return link;
    };

    if (params?.contact) {
      if (photoFile.size) {
        setUploading(true);
        uploadFile(photoFile)
          .then(link => {
            dispatch(
              editContact(params.contact.id, {
                ...data,
                country_code: code.dial_code,
                contact_picture: link,
              }),
            );
          })
          .catch(err => console.log(err, 'err'));
        setUploading(false);
      } else {
        let form = {
          ...data,
          country_code: code.dial_code,
          contact_picture: params.contact.contact_picture,
        };
        dispatch(editContact(params.contact.id, form));

        navigation.navigate(CONTACT_DETAILS, {form});
      }
    } else {
      if (photoFile?.size) {
        setUploading(true);
        uploadFile(photoFile)
          .then(link => {
            dispatch(
              createContact({
                ...data,
                country_code: code.dial_code,
                contact_picture: link,
              }),
            );
          })
          .catch(err => console.log(err, 'err'));
        setUploading(false);
      } else {
        let form = {...data, country_code: code.dial_code};
        console.log(form, 'CREATED CONTACT');
        dispatch(createContact(form));
      }
    }
    navigation.navigate(CONTACT_LIST);
  };

  const onFileSelected = async (image: any) => {
    closeSheet();
    setPhotoFile(image);
  };

  return (
    <Box flex={1} backgroundColor="white">
      <Container>
        <Box marginHorizontal="xl">
          <Box marginVertical="m" alignItems="center">
            <TouchableOpacity onPress={openSheet}>
              <Image
                source={{
                  uri:
                    photoFile.path ||
                    DEFAULT_IMAGE_URI ||
                    params.contact.contact_picture,
                }}
                height={100}
                width={100}
                borderRadius={50}
              />
              <Text variant="body" color="secondary">
                Choose a photo
              </Text>
            </TouchableOpacity>
          </Box>
          <Input
            control={control}
            placeholder="First name"
            label="First name"
            name="first_name"
            error={errors.first_name}
            autoFocus
          />
          <Input
            control={control}
            placeholder="Last name"
            label="Last name"
            name="last_name"
            error={errors.last_name}
          />
          <Input
            iconPosistion="left"
            icon={
              <Box pr="s">
                <CountryPicker setCountryCode={setCode} code={code.dial_code} />
              </Box>
            }
            control={control}
            placeholder="Phone number"
            label="Phone number"
            name="phone_number"
            error={errors.phone_number}
            autoCompleteType="tel"
            keyboardType="number-pad"
          />
          <Box
            flexDirection="row"
            justifyContent="space-between"
            marginVertical="m"
            alignItems="center">
            <Text variant="body" color="secondary">
              Add to favorites
            </Text>
            <Switch control={control} name="is_favorite" />
          </Box>
          <Box marginVertical="m">
            <Button
              disabled={loading || uploading}
              loading={loading || uploading}
              height={50}
              label="Submit"
              onPress={handleSubmit(onSubmit)}
            />
          </Box>
        </Box>
      </Container>
      <ImagePicker ref={sheetRef} onFileSelected={onFileSelected} />
    </Box>
  );
};

export default CreateContactView;
