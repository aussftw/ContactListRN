import React, {useState, useEffect} from 'react';
import {Box, Text} from '../../../theme';
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
import LoginSchema from './ LoginValidation';

interface ILoginView {
  data?: any;
  loading: boolean;
}

const logo = require('../../../assets/images/logo.png');

const LoginView = ({data, loading}: ILoginView) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
          <Box marginTop="l" marginHorizontal="xl">
            <Input
              control={control}
              label="Username"
              name="username"
              placeholder="Enter your username"
              error={errors.username}
            />
            <Input
              control={control}
              label="Password"
              name="password"
              secureTextEntry={showPassword}
              placeholder="Enter your password"
              iconPosistion="right"
              error={errors.password}
              icon={
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}>
                  <Box marginHorizontal="s">
                    <Icon
                      type="FeatherIcon"
                      size={20}
                      name={!showPassword ? 'eye' : 'eye-off'}
                    />
                  </Box>
                </TouchableOpacity>
              }
            />
            <Box marginTop="xl" marginHorizontal="xl">
              <Button
                label="Submit"
                loading={loading}
                onPress={handleSubmit(onSubmit)}
                height={40}
              />
            </Box>
          </Box>
        </Box>
      </Container>
      <Box>
        <TouchableOpacity
          onPress={() => navigation.navigate(REGISTER)}
          style={styles.floatingLink}>
          <Box alignItems="center" marginTop="l" flexDirection="row">
            <Text variant="body">Need a new account? </Text>
            <Text variant="body" color="primary">
              Register
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
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
    position: 'absolute',
    bottom: scale(10),
    left: 0,
    right: 0,
    alignItems: 'center',
    marginBottom: scale(10),
  },
});
