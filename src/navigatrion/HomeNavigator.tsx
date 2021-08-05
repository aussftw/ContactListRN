import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  CreateContact,
  ContactList,
  Settings,
  ContactDetails,
  Logout,
} from '../screens';
import {Text} from 'react-native';
import {
  CONTACT_LIST,
  CONTACT_DETAILS,
  CREATE_CONTACT,
  SETTINGS,
  LOGOUT,
} from '../constants/routeNames';

const HomeNavigator = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator initialRouteName="Contacts">
      <HomeStack.Screen
        name={CONTACT_LIST}
        component={ContactList}
        options={{
          headerLeft: () => <Text>Vasya</Text>,
        }}
      />
      <HomeStack.Screen name={CONTACT_DETAILS} component={ContactDetails} />
      <HomeStack.Screen name={CREATE_CONTACT} component={CreateContact} />
      <HomeStack.Screen name={SETTINGS} component={Settings} />
      <HomeStack.Screen name={LOGOUT} component={Logout} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
