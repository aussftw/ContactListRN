import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {ThemeProvider} from '@shopify/restyle';
import AuthNavigator from './AuthNavigator';
import {theme} from '..';
import {appStateType} from '../redux/store';
import DrawerNavigator from './DrawerNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import {Box, Text} from '..';
import {setLoginSuccess} from '../redux/actions/authActions';

const AppNavigationContainer = () => {
  const dispatch = useDispatch();
  const isLogined: boolean = useSelector(
    (state: appStateType) => state.auth.isLogined,
  );
  const [isAuthLoaded, setAuthLoaded] = useState<boolean>(false);

  const getUser = async () => {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      dispatch(setLoginSuccess());
    }
    setAuthLoaded(true);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (isAuthLoaded) {
      SplashScreen.hide();
    }
  }, [isAuthLoaded]);

  return (
    <ThemeProvider {...{theme}}>
      {isAuthLoaded ? (
        <NavigationContainer>
          {!isLogined ? <AuthNavigator /> : <DrawerNavigator />}
        </NavigationContainer>
      ) : (
        <Box
          flex={1}
          backgroundColor="primary"
          justifyContent="center"
          alignItems="center">
          <Text color="white" variant="title1">
            Loading...
          </Text>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default AppNavigationContainer;
