import React, {useEffect} from 'react';
import {RegisterView} from '../../components';
import {IRegisterForm} from '../../types/register';
import {useSelector} from 'react-redux';
import {appStateType} from '../../redux/store';
import {useDispatch} from 'react-redux';
import {registerUser, clearAuthState} from '../../redux/actions/authActions';
import {useNavigation} from '@react-navigation/core';
import {LOGIN} from '../../constants/routeNames';

const Register: React.FC = () => {
  const error = useSelector((state: appStateType) => state.auth.error);
  const loading = useSelector((state: appStateType) => state.auth.loading);
  const data = useSelector((state: appStateType) => state.auth.data);
  const navigation = useNavigation();

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      dispatch(clearAuthState());
      navigation.navigate(LOGIN, {data});
    }
  }, [data]);

  const dispatch = useDispatch();
  const sendForm = (formObj: IRegisterForm) => {
    dispatch(registerUser(formObj));
  };

  return (
    <RegisterView
      error={error}
      loading={loading}
      sendForm={sendForm}
      data={data}
    />
  );
};

export default Register;
