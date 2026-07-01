import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR, ADD_POST } from './types';

export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response?.statusText
    });
  }
};

export const addPost = formData => async dispatch => {
  try {
    const res = await axios.post('/api/posts', formData, {
      headers: { 'Content-Type': 'application/json' }
    });

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    const errors = err.response?.data?.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
