import React, {useState} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Box, Text, useTheme} from '../../../theme';
import {useNavigation} from '@react-navigation/core';
import {LOGIN} from '../../../constants/routeNames';
import {Button, Input, Icon} from '../../common';
import {useForm, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import RegisterSchema from './RegisterValidation';
import {IRegisterForm, IRegisterError} from '../../../types/register';
import {appStateType} from '../../../redux/store';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';

interface IRegisterView {
  error?: IRegisterError;
  loading: boolean;
  sendForm: (data: IRegisterForm) => void;
  data?: {};
}

const RegisterView = ({loading, sendForm}: IRegisterView) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const error = useSelector((state: appStateType) => state.auth.error);

  const {
    handleSubmit,
    control,
    formState: {errors}, // potencialy we will need to to use server errors handler setError
  } = useForm({resolver: yupResolver(RegisterSchema)});

  const onSubmit: SubmitHandler<IRegisterForm> = data => {
    let form;
    delete data.confirm_password;
    form = data;
    sendForm(form);
  };

  const logo = require('../../../assets/images/logo.png');

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <Box padding="m">
        {loading ? (
          <Box justifyContent="center" alignItems="center" flex={1}>
            <Text>LOADING</Text>
          </Box>
        ) : (
          <Box>
            <Box alignItems="center" marginTop="l">
              <Image source={logo} style={styles.logo} />
            </Box>
            <Box alignItems="center">
              <Text variant="title2">Welcome to RNContaxt</Text>
              <Text variant="title1">Please login bellow</Text>
            </Box>
            <Box marginTop="m" marginHorizontal="l">
              <Input
                label="Username"
                name="username"
                control={control}
                placeholder="Enter your username"
                error={errors.username || error?.username?.[0]}
                autoFocus
              />
              <Input
                label="Fist Name"
                placeholder="Enter your Fist Name"
                name="first_name"
                error={errors.first_name || error?.first_name?.[0]}
                control={control}
              />
              <Input
                label="Last Name"
                placeholder="Enter your Last Name"
                name="last_name"
                control={control}
                error={errors.last_name || error?.last_name?.[0]}
              />
              <Input
                label="Email"
                placeholder="Enter your email"
                name="email"
                control={control}
                error={errors.email || error?.email?.[0]}
              />
              <Input
                label="Passowrd"
                placeholder="Enter your password"
                iconPosistion="right"
                error={errors.password || error?.password?.[0]}
                secureTextEntry
                icon={
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}>
                    <Box marginHorizontal="s">
                      <Icon
                        type="FeatherIcon"
                        size={20}
                        name={!showPassword ? 'eye' : 'eye-off'}
                        color={theme.colors.primary}
                      />
                    </Box>
                  </TouchableOpacity>
                }
                name="password"
                maxLength={24}
                control={control}
              />
              <Input
                label="Confirm passowrd"
                placeholder="Enter your password"
                iconPosistion="right"
                error={errors.confirm_password}
                secureTextEntry
                maxLength={24}
                icon={
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}>
                    <Box marginHorizontal="s">
                      <Icon
                        type="FeatherIcon"
                        size={20}
                        name={!showPassword ? 'eye' : 'eye-off'}
                        color={theme.colors.primary}
                      />
                    </Box>
                  </TouchableOpacity>
                }
                name="confirm_password"
                control={control}
              />
              <Box marginTop="l" marginHorizontal="xl">
                <Button
                  loading={loading}
                  disabled={loading} // || errorsState ? true : false
                  label="Submit"
                  height={theme.spacing.xl}
                  onPress={handleSubmit(onSubmit)}
                />
              </Box>
            </Box>

            <Box alignItems="center">
              <TouchableOpacity onPress={() => navigation.navigate(LOGIN)}>
                <Box alignItems="center" marginTop="l" flexDirection="row">
                  <Text variant="body">Already have one? </Text>
                  <Text variant="body" color="primary">
                    Login
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
          </Box>
        )}
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default RegisterView;

const styles = StyleSheet.create({
  logo: {
    height: 240,
    width: 240,
  },
});
