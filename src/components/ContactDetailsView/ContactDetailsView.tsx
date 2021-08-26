import React, {FC} from 'react';
import {Box, Text, useTheme} from '../../theme';
import {IContact} from '../../types/contact';
import {TouchableOpacity, ScrollView} from 'react-native';
import {Button} from '../../components/common/index';
import {CREATE_CONTACT} from '../../constants/routeNames';
import {useNavigation} from '@react-navigation/native';
import ImageComponent from './ImageComponent';
import Icon from '../common/Icon/Icon';

interface IContactDetilsView {
  contact: IContact;
}

const ContactDetailsView: FC<IContactDetilsView> = ({
  contact,
}: IContactDetilsView) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const {
    country_code,
    id,
    first_name,
    last_name,
    phone_number,
    contact_picture,
    is_favorite,
  } = contact;

  const capitalize = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // move to helpers

  const connectionOptions = [
    {iconName: 'phone', onPress: () => console.log('keck'), label: 'Call'},
    {iconName: 'message', onPress: () => console.log('keck'), label: 'Text'},
    {
      iconName: 'voice-chat',
      onPress: () => console.log('keck'),
      label: 'Video',
    },
  ];

  return (
    <ScrollView
    // showsVerticalScrollIndicator={false}
    // style={{flex: 1, backgroundColor: 'white'}}
    >
      <Box>
        <Box>{contact_picture && <ImageComponent src={contact_picture} />}</Box>

        <Box ml="xl" marginVertical="m">
          <Text color="secondary" variant="title2">
            {capitalize(first_name)} {capitalize(last_name)}
          </Text>
        </Box>
        <Box backgroundColor="darkGrey" height={0.4} />
        <Box
          flexDirection="row"
          justifyContent="space-between"
          marginHorizontal="xl"
          marginVertical="l">
          {connectionOptions.map(({onPress, label, iconName}) => (
            <TouchableOpacity onPress={onPress} key={label}>
              <Box alignItems="center">
                <Icon
                  name={iconName}
                  size={35}
                  type="MaterialIcon"
                  color={theme.colors.primary}
                />
                <Text mt="s" color="secondary" variant="body">
                  {label}
                </Text>
              </Box>
            </TouchableOpacity>
          ))}
        </Box>
        <Box backgroundColor="darkGrey" height={0.4} />

        <TouchableOpacity onPress={() => true}>
          <Box
            flexDirection="row"
            alignItems="center"
            marginVertical="xl"
            marginHorizontal="xl">
            <Icon
              size={34}
              name="skype"
              type="AntDesignIcon"
              color={theme.colors.primary}
            />
            <Text color="secondary" variant="body" ml="l">
              Skype Call to phone {country_code} {phone_number}
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
      <Box backgroundColor="darkGrey" height={0.4} />
      <Box
        marginHorizontal="xl"
        marginVertical="xl"
        flexDirection="row-reverse">
        <Button
          label="EDIT CONTACT"
          onPress={() => navigation.navigate(CREATE_CONTACT, {contact})}
          height={50}
          width={200}
        />
      </Box>
    </ScrollView>
  );
};

export default ContactDetailsView;
