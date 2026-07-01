import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {}
};

export default function profileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
        error: {}
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
        error: {}
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: payload.status === 400 ? null : state.profile
      };
    case CLEAR_PROFILES:
      return {
        ...state,
        profiles: []
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
        loading: true,
        error: {}
      };
    default:
      return state;
  }
}
