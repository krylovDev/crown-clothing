import { AnyAction } from 'redux';
import {
  signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed, signUpSuccess,
} from './user.actions';
import { SignUpSuccess, USER_ACTION_TYPES, UserState } from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (
  state: UserState = INITIAL_STATE,
  action = {} as AnyAction,
) => {
  if (signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
    };
  }

  if (signOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null,
    };
  }

  if (signUpSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
    };
  }

  if (signInFailed.match(action)
		|| signUpFailed.match(action)
		|| signOutFailed.match(action)
  ) {
    return {
      ...state,
      error: action.payload,
    };
  }

  return state;
};
