import React from 'react';

import Container from '../../common/Container/Container';
import {Box} from '../../../theme';
import DrawerItem from '../DrawerItem/DrawerItem';
import {SETTINGS} from '../../../constants/routeNames';
import {Image, StyleSheet, Alert} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../../redux/actions/authActions';

interface IDrawerContainer {
  navigation: any;
}

const logo = require('../../../assets/images/logo.png');

const DrawerContainer = ({navigation}: IDrawerContainer) => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    Alert.alert('Log Out!', 'Are you sure that you want to Log Out?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        // style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          navigation.dispatch(DrawerActions.closeDrawer());
          dispatch(logoutUser());
        },
      },
    ]);
  };

  const navItems = [
    {
      screen: 'Settings',
      label: SETTINGS,
      icon: 'settings',
      onPress: () => navigation.navigate(SETTINGS),
    },

    {
      screen: 'Login',
      label: 'Log Out',
      icon: 'logout',
      onPress: () => handleLogOut(),
    },
  ];
  return (
    <Container>
      <Box alignItems="center">
        <Box mt="xl">
          <Image source={logo} style={styles.logo} />
        </Box>
        <Box>
          {navItems.map(item => (
            <DrawerItem
              key={item.screen}
              label={item.label}
              screen={item.screen}
              onPress={item.onPress}
              icon={item.icon}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default DrawerContainer;

const styles = StyleSheet.create({
  logo: {
    height: 240,
    width: 240,
  },
});
