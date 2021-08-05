import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login, Register} from '../screens';
import {REGISTER, LOGIN} from '../constants/routeNames';

type AuthRoutes = {
  Login: undefined;
  Register: undefined;
};

const AuthNavigator = () => {
  const AuthStack = createStackNavigator<AuthRoutes>();
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen
        name={LOGIN}
        component={Login}
        //  options={{gestureEnabled: false}}
        // enable this when finish with Drawer
      />
      <AuthStack.Screen
        name={REGISTER}
        component={Register}
        // options={{gestureEnabled: false}}
        // enable this when finish with Drawer
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
