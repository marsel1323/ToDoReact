import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

const signup = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/signup',
      formProps,
    );
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

export {
  signup,
};
