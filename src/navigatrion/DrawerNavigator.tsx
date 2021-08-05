import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeNavigator from './HomeNavigator';
import {HOME_NAVIGATOR} from '../constants/routeNames';
import DrawerContainer from '../components/Drawer/DrawerContainer/DrawerContainer';

type DrawerRoutes = {
  Home: undefined;
};

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator<DrawerRoutes>();

  return (
    <Drawer.Navigator
      drawerType="slide"
      drawerContent={props => <DrawerContainer {...props} />}>
      <Drawer.Screen name={HOME_NAVIGATOR} component={HomeNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
