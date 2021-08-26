import React, {useState, useEffect, FC} from 'react';
import {Box, Text, useTheme} from '../../../theme';
import {Container, Input, Button, Icon} from '../../common/index';
import {useForm, SubmitHandler} from 'react-hook-form';
import {ILoginForm} from '../../../types/login';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../redux/actions/authActions';
import {TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {REGISTER} from '../../../constants/routeNames';
import {yupResolver} from '@hookform/resolvers/yup';
import {ScaledSheet, scale, moderateScale} from 'react-native-size-matters';
import {useScreen} from '../../../hooks/useScreen';
import {usePlatform} from '../../../hooks/usePlatform';
import LoginSchema from './ LoginValidation';

interface ILoginView<T> {
  data?: T;
  loading: boolean;
}

const logo = require('../../../assets/images/logo.png');

const LoginView: FC<ILoginView> = ({data, loading}: ILoginView) => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const navigation = useNavigation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const screen = useScreen();
  const platform = usePlatform();

  const {
    handleSubmit,
    control,
    setValue,
    formState: {errors},
  } = useForm({resolver: yupResolver(LoginSchema)});

  useEffect(() => {
    if (data) {
      setValue('username', data.username);
    }
  });

  const onSubmit: SubmitHandler<ILoginForm> = data => dispatch(loginUser(data));

  return (
    <>
      <Container>
        <Box>
          <Box alignItems="center" marginTop="l">
            <Image source={logo} style={styles.logo} />
          </Box>
          <Box alignItems="center">
            <Text variant="title2">Welcome to RNContacts</Text>
            <Text variant="title1">Please login bellow</Text>
          </Box>
          <Box
            marginTop="l"
            marginHorizontal={screen.isSmallDevice ? 'l' : 'xl'}>
            <Input
              control={control}
              label="Username"
              name="username"
              placeholder="Enter your username"
              error={errors.username}
              autoFocus
            />
            <Input
              control={control}
              label="Password"
              name="password"
              secureTextEntry={showPassword}
              placeholder="Enter your password"
              iconPosistion="right"
              error={errors.password}
              maxLength={24}
              icon={
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}>
                  <Box marginHorizontal="s">
                    <Icon
                      type="FeatherIcon"
                      size={20}
                      name={!showPassword ? 'eye' : 'eye-off'}
                      color={
                        errors?.pasword
                          ? theme.colors.danger
                          : theme.colors.primary
                      }
                    />
                  </Box>
                </TouchableOpacity>
              }
            />
            <Box
              marginTop="xl"
              marginHorizontal={screen.isSmallDevice ? 'l' : 'xl'}>
              <Button
                label="Submit"
                loading={loading}
                onPress={handleSubmit(onSubmit)}
                height={40}
              />
            </Box>
          </Box>
        </Box>
        {screen.isSmallDevice || platform.isAndroid ? (
          <TouchableOpacity
            onPress={() => navigation.navigate(REGISTER)}
            style={
              screen.isSmallDevice || platform.isAndroid
                ? [styles.floatingLink]
                : [styles.floatingLinkPostion, styles.floatingLink]
            }>
            <Box alignItems="center" marginTop="l" flexDirection="row">
              <Text variant="body">Need a new account? </Text>
              <Text variant="body" color="primary">
                Register
              </Text>
            </Box>
          </TouchableOpacity>
        ) : null}
      </Container>
      {screen.isSmallDevice || platform.isAndroid ? null : (
        <TouchableOpacity
          onPress={() => navigation.navigate(REGISTER)}
          style={
            screen.isSmallDevice
              ? [styles.floatingLink]
              : [styles.floatingLinkPostion, styles.floatingLink]
          }>
          <Box alignItems="center" marginTop="l" flexDirection="row">
            <Text variant="body">Need a new account? </Text>
            <Text variant="body" color="primary">
              Register
            </Text>
          </Box>
        </TouchableOpacity>
      )}
    </>
  );
};

export default LoginView;

const styles = ScaledSheet.create({
  logo: {
    height: moderateScale(220),
    width: moderateScale(200),
  },
  floatingLink: {
    bottom: scale(10),
    marginBottom: scale(10),
    alignItems: 'center',
  },

  floatingLinkPostion: {
    left: 0,
    right: 0,
    position: 'absolute',
  },

  floatingLinkInvisible: {
    display: 'none',
  },
});
