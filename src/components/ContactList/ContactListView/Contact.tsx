import React, {FC} from 'react';
import {Box, Text, useTheme} from '.././../../theme';
import {TouchableOpacity, Image} from 'react-native';
import {IContact} from '../../../types/contact';
import {Icon} from '../../common/';
import {useNavigation} from '@react-navigation/native';
import {CONTACT_DETAILS} from '../../../constants/routeNames';

interface IContactView {
  item: IContact;
}

const Contact: FC<IContactView> = ({item}: IContactView) => {
  const navigation = useNavigation();
  const {
    country_code,
    id,
    first_name,
    last_name,
    phone_number,
    contact_picture,
    is_favorite,
  } = item.item;

  const theme = useTheme();
  //console.log(contact_picture);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(CONTACT_DETAILS, {
          country_code,
          id,
          first_name,
          last_name,
          phone_number,
          contact_picture,
          is_favorite,
        })
      }>
      <Box
        backgroundColor="white"
        shadowColor="black"
        shadowOpacity={0.25}
        shadowRadius={3.84}
        shadowOffset={{width: 0, height: 2}}
        elevation={5}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <Box flexDirection="row" alignItems="center">
          <Box height={100} width={100}>
            {contact_picture ? (
              <Image
                source={{uri: contact_picture}}
                height={45}
                width={45}
                borderRadius={50}
              />
            ) : (
              <Box
                backgroundColor="grey"
                height={45}
                width={45}
                borderRadius={50}
                justifyContent="center"
                alignItems="center">
                <Text variant="nav" color="secondary">
                  {first_name[0].toUpperCase()}
                  {last_name[0].toUpperCase()}
                </Text>
              </Box>
            )}
          </Box>
          <Box>
            <Box flexDirection="row">
              <Text variant="body" color="secondary">
                {first_name} {last_name}
              </Text>
            </Box>
            <Box flexDirection="row">
              <Text variant="body">
                {country_code} {phone_number}
              </Text>
            </Box>
          </Box>
        </Box>

        <Icon
          type="MaterialIcon"
          name="play-arrow"
          size={30}
          color={theme.colors.secondary}
        />
      </Box>
    </TouchableOpacity>
  );
};

export default Contact;
