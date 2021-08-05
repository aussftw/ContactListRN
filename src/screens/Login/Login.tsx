import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {clearAuthState} from '../../redux/actions/authActions';
import {appStateType} from '../../redux/store';
import {useRoute} from '@react-navigation/core';

import LoginView from '../../components/Login/LoginView/LoginView';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: appStateType) => state.auth.data);
  const loading = useSelector((state: appStateType) => state.auth.loading);

  const {params} = useRoute();

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      dispatch(clearAuthState());
    }
  }, [data]);

  return <LoginView data={params?.data} loading={loading} />;
};

export default Login;
