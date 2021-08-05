import React, {useEffect, useState} from 'react';

import {useRoute} from '@react-navigation/core';
import {useNavigation} from '@react-navigation/core';
import {ContactDetailsView} from '../../components';
import {TouchableOpacity, Alert} from 'react-native';
import {Icon} from '../../components/common/index';
import {Box} from '../../theme';
import {useDispatch} from 'react-redux';
import {deleteContact} from '../../redux/actions/contactsActions';
import {CONTACT_LIST} from '../../constants/routeNames';

const ContactDetails: React.FC = () => {
  const {params} = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {setOptions} = useNavigation();

  console.log(params, 'screen');

  const [isFavorite, setFavorite] = useState<boolean>(params.is_favorite); // update

  useEffect(() => {
    if (params) {
      setOptions({
        title: params.first_name + ' ' + params.last_name,
        headerRight: () => {
          return (
            <Box flexDirection="row" mr="l" alignItems="center">
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'Delete contact',
                    'Are you sure that you want to delete contact?',
                    [
                      {
                        text: 'No',
                      },
                      {
                        text: 'Yes',
                        onPress: () => {
                          dispatch(deleteContact(params.id));
                          navigation.navigate(CONTACT_LIST);
                        },
                      },
                    ],
                  );
                }}>
                <Icon name="delete" size={30} type="MaterialCommunityIcon" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setFavorite(!isFavorite);
                }}>
                <Box ml="s">
                  <Icon
                    name={params.is_favorite ? 'star' : 'star-border'}
                    size={30}
                    type="MaterialIcon"
                  />
                </Box>
              </TouchableOpacity>
            </Box>
          );
        },
      });
    }
  }, []);

  return <ContactDetailsView contact={params} />;
};

export default ContactDetails;
