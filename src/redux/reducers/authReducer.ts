import {AuthActionsType} from '../actions/authActions';
import {IRegisterError} from '../../types/register';
import {
  REGISTER_FAILED,
  REGISTER_LOADING,
  CLEAR_AUTH_STATE,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_LOADING,
  LOGOUT_USER,
} from '../../constants/actionTypes/index';

interface IInitialState {
  isLogined: boolean;
  data: {};
  error: IRegisterError;
  loading: boolean;
}
const initialState: IInitialState = {
  isLogined: false,
  data: {},
  error: {},
  loading: false,
};

const authReducer = (state = initialState, action: AuthActionsType) => {
  switch (action.type) {
    case REGISTER_LOADING:
      return {...state, loading: true};

    case REGISTER_SUCCESS:
      return {...state, loading: false, data: action.data};

    case REGISTER_FAILED:
      return {...state, loading: false, error: action.error};

    case CLEAR_AUTH_STATE:
      return {...state, loading: false, data: {}, error: {}};

    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        data: {},
        error: action.error,
      };

    case LOGIN_LOADING:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        isLogined: true,
      };

    case LOGOUT_USER:
      return {
        ...state,
        isLoading: false,
        data: {},
        isLogined: false,
      };

    default:
      return state;
  }
};

export default authReducer;
