import React, {useEffect, useCallback, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {DrawerActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {appStateType} from '../../redux/store';
import {useSelector} from 'react-redux';
import {getContacts} from '../../redux/actions/contactsActions';
import {useFocusEffect} from '@react-navigation/core';
import Icon from '../../components/common/Icon/Icon';
import {Box} from '../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ConctactListView from '../../components/ContactList/ContactListView/index';

const ContactList: React.FC = () => {
  const {setOptions} = useNavigation();
  const toggleDrawer = DrawerActions.toggleDrawer;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const contacts = useSelector(
    (state: appStateType) => state.contacts.contacts,
  );
  const loading: boolean = useSelector(
    (state: appStateType) => state.contacts.loading,
  );

  const [order, setOrder] = useState<string | null>('');

  const getSettings = async () => {
    const savedOrder = await AsyncStorage.getItem('order');
    setOrder(savedOrder);
  };

  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.dispatch(toggleDrawer())}>
          <Box p="s">
            <Icon type="MaterialIcon" name="menu" size={25} />
          </Box>
        </TouchableOpacity>
      ),
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      getSettings();
      dispatch(getContacts);
      return () => {};
    }, [dispatch]),
  );

  return <ConctactListView loading={loading} data={contacts} order={order} />;
};

export default ContactList;
