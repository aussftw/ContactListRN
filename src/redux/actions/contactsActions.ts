import {
  GET_CONTACTS_LOADING,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAILED,
  CREATE_CONTACT_LOADING,
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAILED,
  DELETE_CONTACT_LOADING,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAILED,
  EDIT_CONTACT_LOADING,
  EDIT_CONTACT_FAILED,
  EDIT_CONTACT_SUCCESS,
} from '../../constants/actionTypes/index';
import axiosInstance from '../../helpers/axiosInterceptor';
import {AppDispatch} from '../store';
import {IContact} from '../../types/contact';

type GetContactsLoadingType = {
  type: typeof GET_CONTACTS_LOADING;
  isLoading: boolean;
};

type GetContactstFailedType = {
  type: typeof GET_CONTACTS_FAILED;
  error: any;
};

type GetContactsSuccessType = {
  type: typeof GET_CONTACTS_SUCCESS;
  data: any;
};

type CreateContactLoadingType = {
  type: typeof CREATE_CONTACT_LOADING;
  isLoading: boolean;
};

type CreateContactFailedType = {
  type: typeof CREATE_CONTACT_FAILED;
  error: any;
};

type CreateContactSuccessType = {
  type: typeof CREATE_CONTACT_SUCCESS;
  data: any;
};

type DeleteContactLoadingType = {
  type: typeof DELETE_CONTACT_LOADING;
  isLoading: boolean;
};

type DeleteContactFailedType = {
  type: typeof DELETE_CONTACT_FAILED;
  error: any;
};

type DeleteContactSuccessType = {
  type: typeof DELETE_CONTACT_SUCCESS;
  data: any;
};

type EditContactLoadingType = {
  type: typeof EDIT_CONTACT_LOADING;
  isLoading: boolean;
};

type EditContactFailedType = {
  type: typeof EDIT_CONTACT_FAILED;
  error: any;
};

type EditContactSuccessType = {
  type: typeof EDIT_CONTACT_SUCCESS;
  data: IContact;
};

export const setGetContactsLoading = (
  isLoading: boolean,
): GetContactsLoadingType => {
  return {
    type: GET_CONTACTS_LOADING,
    isLoading,
  };
};

export const setGetContactsError = (error: any): GetContactstFailedType => {
  return {
    type: GET_CONTACTS_FAILED,
    error,
  };
};

export const setGetContactsSuccess = (data: any): GetContactsSuccessType => {
  return {
    type: GET_CONTACTS_SUCCESS,
    data,
  };
};

export const setCreateContactLoading = (
  isLoading: boolean,
): CreateContactLoadingType => {
  return {
    type: CREATE_CONTACT_LOADING,
    isLoading,
  };
};

export const setCreateContactError = (error: any): CreateContactFailedType => {
  return {
    type: CREATE_CONTACT_FAILED,
    error,
  };
};

export const setCreateContactSuccess = (
  data: any,
): CreateContactSuccessType => {
  return {
    type: CREATE_CONTACT_SUCCESS,
    data,
  };
};

export const setDeleteContactLoading = (
  isLoading: boolean,
): DeleteContactLoadingType => {
  return {
    type: DELETE_CONTACT_LOADING,
    isLoading,
  };
};

export const setDeleteContactError = (error: any): DeleteContactFailedType => {
  return {
    type: DELETE_CONTACT_FAILED,
    error,
  };
};

export const setDeleteContactSuccess = (
  data: any,
): DeleteContactSuccessType => {
  return {
    type: DELETE_CONTACT_SUCCESS,
    data,
  };
};

export const setEditContactLoading = (
  isLoading: boolean,
): EditContactLoadingType => {
  return {
    type: EDIT_CONTACT_LOADING,
    isLoading,
  };
};

export const setEditContactError = (error: any): EditContactFailedType => {
  return {
    type: EDIT_CONTACT_FAILED,
    error,
  };
};

export const setEditContactSuccess = (
  data: IContact,
): EditContactSuccessType => {
  return {
    type: EDIT_CONTACT_SUCCESS,
    data,
  };
};

export const getContacts = (dispatch: AppDispatch) => {
  dispatch(setGetContactsLoading(true));
  dispatch(setGetContactsError({}));
  axiosInstance
    .get('/contacts/')
    .then(res => {
      // console.log(res.data, 'contacts res');
      dispatch(setGetContactsLoading(false));
      dispatch(setGetContactsSuccess(res.data));
    })
    .catch(err => {
      console.log(err, 'contacts err');
      dispatch(setGetContactsLoading(false));
      dispatch(setGetContactsError(err));
    });
};

export const createContact =
  (form: IContact) => async (dispatch: AppDispatch) => {
    const req = {
      country_code: form.country_code || '',
      first_name: form.first_name || '',
      last_name: form.last_name || '',
      phone_number: form.phone_number || '',
      contact_picture: form.contact_picture || null,
      is_favorite: form.is_favorite || false,
    };
    dispatch(setCreateContactLoading(true));
    dispatch(setCreateContactError({}));
    axiosInstance
      .post('/contacts/', req)
      .then(res => {
        // console.log(res.data, 'create contact res');
        dispatch(setCreateContactLoading(false));
        dispatch(setCreateContactSuccess(res.data));
      })
      .catch(err => {
        console.log(err, 'create contact err');
        dispatch(setCreateContactLoading(false));
        dispatch(setCreateContactError(err));
      })
      .then(() => {
        setGetContactsLoading(true);
        dispatch(getContacts);
      });
  };

export const deleteContact = (id: string) => (dispatch: AppDispatch) => {
  dispatch(setDeleteContactLoading(true));
  dispatch(setDeleteContactError({}));
  axiosInstance
    .delete(`/contacts/${id}`)
    .then(res => {
      console.log(res.data, 'delete contact res');
      dispatch(setDeleteContactLoading(false));
      dispatch(setDeleteContactSuccess(id));
    })
    .catch(err => {
      console.log(err, 'delete contact err');
      dispatch(setDeleteContactLoading(false));
      dispatch(setDeleteContactError(err));
    });
};

export const editContact =
  (id: string, data: IContact) => (dispatch: AppDispatch) => {
    const req = {
      country_code: data.country_code || '',
      first_name: data.first_name || '',
      last_name: data.last_name || '',
      phone_number: data.phone_number || '',
      contact_picture: data.contact_picture || null,
      is_favorite: data.is_favorite || false,
    };
    dispatch(setEditContactLoading(true));
    dispatch(setEditContactError({}));
    axiosInstance
      .put(`/contacts/${id}`, req)
      .then(res => {
        console.log(res.data, 'edit contact res');
        dispatch(setEditContactLoading(false));
        dispatch(setEditContactSuccess(res.data));
      })
      .catch(err => {
        console.log(err, 'edit contact err');
        dispatch(setEditContactLoading(false));
        dispatch(setEditContactError(err));
      });
  };

export type getContactsActionsType =
  | GetContactstFailedType
  | GetContactsLoadingType
  | GetContactsSuccessType
  | CreateContactLoadingType
  | CreateContactFailedType
  | CreateContactSuccessType
  | DeleteContactLoadingType
  | DeleteContactFailedType
  | DeleteContactSuccessType
  | EditContactLoadingType
  | EditContactFailedType
  | EditContactSuccessType;
