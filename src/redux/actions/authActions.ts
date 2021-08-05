import axiosInstance from '../../helpers/axiosInterceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IRegisterForm, IRegisterError} from '../../types/register';
import {ILoginForm} from '../../types/login';
import {
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  REGISTER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_LOADING,
  LOGOUT_USER,
  CLEAR_AUTH_STATE,
} from '../../constants/actionTypes/index';

type RegisterFailedType = {
  type: typeof REGISTER_FAILED;
  error: IRegisterError;
};

type RegisterSuccessType = {
  type: typeof REGISTER_SUCCESS;
  data: any;
};

type RegisterLoadingType = {
  type: typeof REGISTER_LOADING;
  isLoading: boolean;
};

type ClearAuthStateType = {
  type: typeof CLEAR_AUTH_STATE;
};

type LoginFailedType = {
  type: typeof LOGIN_FAILED;
  error: IRegisterError;
};

type LoginSuccessType = {
  type: typeof LOGIN_SUCCESS;
  data?: any;
};

type LoginLoadingType = {
  type: typeof LOGIN_LOADING;
  isLoading: boolean;
};

type LogoutUserType = {
  type: typeof LOGOUT_USER;
};

export const setRegisterLoading = (isLoading: boolean): RegisterLoadingType => {
  return {
    type: REGISTER_LOADING,
    isLoading,
  };
};

export const setRegisterError = (error: any): RegisterFailedType => {
  return {
    type: REGISTER_FAILED,
    error,
  };
};

export const setRegisterSuccess = (data: any) => {
  return {
    type: REGISTER_SUCCESS,
    data,
  };
};

export const setLoginLoading = (isLoading: boolean): LoginLoadingType => {
  return {
    type: LOGIN_LOADING,
    isLoading,
  };
};

export const setLoginError = (error: any): LoginFailedType => {
  return {
    type: LOGIN_FAILED,
    error,
  };
};

export const setLoginSuccess = (data?: any): LoginSuccessType => {
  return {
    type: LOGIN_SUCCESS,
    data,
  };
};

export const clearAuthState = () => {
  return {
    type: CLEAR_AUTH_STATE,
  };
};

export const setLogoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const loginUser =
  ({username, password}: ILoginForm) =>
  (dispatch: any) => {
    dispatch(setLoginLoading(true));
    dispatch(setLoginError(false));
    axiosInstance
      .post('/auth/login', {username, password})
      .then(res => {
        console.log(res.data, 'res successs');
        dispatch(setLoginLoading(false));
        dispatch(setLoginSuccess(res.data));
        AsyncStorage.setItem('token', res.data.token);
        AsyncStorage.setItem('user', JSON.stringify(res.data.user));
      })
      .catch(err => {
        console.log(err, 'login err');
        dispatch(setLoginLoading(false));
        dispatch(setLoginError(err));
      });
  };

export const registerUser =
  ({username, first_name, last_name, email, password}: IRegisterForm) =>
  (dispatch: any) => {
    dispatch(setRegisterLoading(true));
    dispatch(setRegisterError(false));
    axiosInstance
      .post('/auth/register', {
        username,
        first_name,
        last_name,
        email,
        password,
      })
      .then(res => {
        dispatch(setRegisterLoading(false));
        dispatch(setRegisterSuccess(res.data));
        console.log(res, 'RES ACTION');
      })
      .catch(err => {
        dispatch(setRegisterLoading(false));
        dispatch(setRegisterError(err));
        console.log(err, 'ERR ACTION');
      });
  };

export const logoutUser = () => (dispatch: any) => {
  AsyncStorage.removeItem('token');
  AsyncStorage.removeItem('user');
  AsyncStorage.removeItem('order');
  dispatch(setLogoutUser());
};

export type AuthActionsType =
  | RegisterFailedType
  | RegisterSuccessType
  | RegisterLoadingType
  | ClearAuthStateType
  | LoginFailedType
  | LoginLoadingType
  | LoginSuccessType
  | LogoutUserType;
