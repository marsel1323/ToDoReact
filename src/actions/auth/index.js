import { AUTH_USER, AUTH_ERROR } from './types';

import instance from '../../interceptors';

const signup = (formProps, callback) => async (dispatch) => {
  try {
    const response = await instance.post('/auth/signup', formProps);
    console.log(response);
    const token = response.data;

    dispatch({ type: AUTH_USER, payload: token });

    window.localStorage.setItem('token', JSON.stringify(token));
    callback();
  } catch (error) {
    window.localStorage.removeItem('token');
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};

const signin = (formProps, callback) => async (dispatch) => {
  try {
    const response = await instance.post('/auth/login', formProps);
    console.log(response);
    const token = response.data;

    dispatch({ type: AUTH_USER, payload: token });

    window.localStorage.setItem('token', JSON.stringify(token));
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
};

const signout = () => {
  window.localStorage.removeItem('token');
  return {
    type: AUTH_USER,
    payload: '',
  };
};

export {
  signup,
  signin,
  signout,
};
