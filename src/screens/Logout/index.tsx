import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../redux/actions/authActions';

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser());
  }, []);
  return <ActivityIndicator />;
};

export default Logout;
