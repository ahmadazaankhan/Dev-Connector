import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from './types';

export const getCurrentProfile = () => async dispatch => {
  dispatch({ type: PROFILE_LOADING });

  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.data?.msg || err.response?.statusText,
        status: err.response?.status
      }
    });
  }
};

export const getProfileById = profileId => async dispatch => {
  dispatch({ type: PROFILE_LOADING });

  try {
    const res = await axios.get(`/api/profile/${profileId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.data?.msg || 'Profile not found',
        status: err.response?.status
      }
    });
    dispatch(setAlert('Profile not found', 'danger'));
  }
};

export const getProfiles = () => async dispatch => {
  dispatch({ type: PROFILE_LOADING });

  try {
    const res = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.statusText,
        status: err.response?.status
      }
    });
  }
};

export const createProfile = (formData, navigate, edit = false) => async dispatch => {
  try {
    const res = await axios.post('/api/profile', formData, {
      headers: { 'Content-Type': 'application/json' }
    });

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
    navigate('/dashboard');
  } catch (err) {
    const errors = err.response?.data?.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.statusText,
        status: err.response?.status
      }
    });
  }
};

export const addExperience = (formData, navigate) => async dispatch => {
  try {
    const res = await axios.put('/api/profile/experience', formData, {
      headers: { 'Content-Type': 'application/json' }
    });

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Added', 'success'));
    navigate('/dashboard');
  } catch (err) {
    const errors = err.response?.data?.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const addEducation = (formData, navigate) => async dispatch => {
  try {
    const res = await axios.put('/api/profile/education', formData, {
      headers: { 'Content-Type': 'application/json' }
    });

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Added', 'success'));
    navigate('/dashboard');
  } catch (err) {
    const errors = err.response?.data?.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch(setAlert('Error removing experience', 'danger'));
  }
};

export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch(setAlert('Error removing education', 'danger'));
  }
};

export const clearProfiles = () => ({
  type: CLEAR_PROFILES
});

export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});
