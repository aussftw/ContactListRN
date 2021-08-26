import {
  GET_CONTACTS_LOADING,
  GET_CONTACTS_FAILED,
  GET_CONTACTS_SUCCESS,
  CREATE_CONTACT_LOADING,
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAILED,
  DELETE_CONTACT_LOADING,
  DELETE_CONTACT_FAILED,
  DELETE_CONTACT_SUCCESS,
  EDIT_CONTACT_LOADING,
  EDIT_CONTACT_FAILED,
  EDIT_CONTACT_SUCCESS,
} from '../../constants/actionTypes';
import {getContactsActionsType} from '../actions/contactsActions';
import {IContact} from '../../types/contact';

interface IInitialState {
  isLogined: boolean;
  contacts: Array<IContact> | [];
  contact: IContact | null;
  error: {};
  loading: boolean;
}

const initialState: IInitialState = {
  isLogined: false,
  contact: null,
  contacts: [] as Array<IContact>,
  error: {},
  loading: false,
};

const contactsReducer = (
  state = initialState,
  action: getContactsActionsType,
) => {
  switch (action.type) {
    case GET_CONTACTS_LOADING:
      return {...state, loading: true};
    case GET_CONTACTS_SUCCESS:
      return {...state, loading: false, contacts: action.data};
    case GET_CONTACTS_FAILED:
      return {...state, loading: false, error: action.error};
    case GET_CONTACTS_FAILED:
      return {...state, loading: false, error: action.error};
    case CREATE_CONTACT_LOADING:
      return {...state, loading: true, error: false};
    case CREATE_CONTACT_FAILED:
      return {...state, loading: false, error: action.type};
    case CREATE_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: [action.data, ...state.contacts],
      };
    case DELETE_CONTACT_LOADING:
      return {...state, loading: true};
    case DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: state.contacts.filter(
          (item: IContact) => item.id !== action.data,
        ),
      };
    case DELETE_CONTACT_FAILED:
      return {...state, loading: false, error: action.error};

    case EDIT_CONTACT_LOADING:
      return {...state, loading: true};

    case EDIT_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: state.contacts.map((item: IContact) => {
          if (item.id === action.data.id) {
            return action.data;
          } else {
            return item;
          }
        }),
      };

    case EDIT_CONTACT_FAILED:
      return {...state, loading: false, error: action.error};

    default:
      return state;
  }
};

export default contactsReducer;
