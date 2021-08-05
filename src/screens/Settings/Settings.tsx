import React, {useState, useEffect} from 'react';
import SettingsView from '../../components/SettingsView/SettingsView';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
  const [email, setEmail] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [order, setOrder] = useState<string | null>('Last Name');

  const saveSetting = (key: string, value: string) => {
    AsyncStorage.setItem(key, value);
  };
  const settingsOptions = [
    {
      title: 'My Info',
      subTitle: 'Setup your profile',
      onPress: () => {
        setModalVisible(true);
      },
    },
    {
      title: 'Accounts',
      subTitle: '',
      onPress: () => {
        setModalVisible(true);
      },
    },
    {
      title: 'Default account for new contacts',
      subTitle: email,
      onPress: () => {},
    },
    {
      title: 'Contacts to display',
      subTitle: 'All contacts',
      onPress: () => {
        setModalVisible(true);
      },
    },
    {
      title: 'Sort by',
      subTitle: order,
      onPress: () => {
        setModalVisible(true);
      },
    },
    {
      title: 'Name format',
      subTitle: 'First name first',
      onPress: () => {
        setModalVisible(true);
      },
    },
    {title: 'Import', subTitle: null, onPress: () => {}},
    {title: 'Export', subTitle: null, onPress: () => {}},
    {
      title: 'Blocked numbers',
      subTitle: null,
      onPress: () => {
        setModalVisible(true);
      },
    },
    {
      title: 'About RNContacts',
      subTitle: null,
      onPress: () => {
        setModalVisible(true);
      },
    },
  ];

  const prefOptions = [
    {
      name: 'First name',
      selected: order === 'First name',
      onPress: () => {
        saveSetting('order', 'First name');
        setOrder('First name');
        setModalVisible(false);
      },
    },
    {
      name: 'Last name',
      selected: order === 'Last name',
      onPress: () => {
        saveSetting('order', 'Last name');
        setOrder('Last name');
        setModalVisible(false);
      },
    },
  ];

  console.log(order, 'SETTINGS');

  const getSettings = async () => {
    const user = await AsyncStorage.getItem('user');
    const orderPref = await AsyncStorage.getItem('order');
    if (orderPref) {
      setOrder(orderPref);
    }
    setEmail(JSON.parse(user).email);
  };

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <SettingsView
      settingsOptions={settingsOptions}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      prefOptions={prefOptions}
    />
  );
};

export default Settings;
