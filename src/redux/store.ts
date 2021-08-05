import {applyMiddleware, combineReducers, createStore} from 'redux';
import authReducer from './reducers/authReducer';
import thunk from 'redux-thunk';
import contactsReducer from './reducers/contactsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  contacts: contactsReducer,
});

const middlewares = [thunk];

export type appStateType = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
