import { User } from 'firebase/auth';
import { AdditionalInformation, UserData } from '../../utils/database/firebase.types';
import { withMatcher } from '../../utils/reducer/reducer.utils.types';
import { createAction } from '../../utils/reducer/reducer.utils';
import {
  CheckUserSession,
  EmailSignInStart,
  EmailSignUpStart,
  GoogleSignInStart,
  SetCurrentUser,
  SignInFailed,
  SignInSuccess,
  SignOutFailed,
  SignOutStart,
  SignOutSuccess,
  SignUpFailed,
  SignUpSuccess,
  USER_ACTION_TYPES,
} from './user.types';

const setCurrentUser = withMatcher((user: UserData): SetCurrentUser => createAction(
  USER_ACTION_TYPES.SET_CURRENT_USER,
  user,
));

const checkUserSession = withMatcher((): CheckUserSession => createAction(
  USER_ACTION_TYPES.CHECK_USER_SESSION,
));

// __________ Sign in  __________
const googleSignInStart = withMatcher((): GoogleSignInStart => createAction(
  USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,
));

const emailSignInStart = withMatcher((
  email: string,
  password: string,
): EmailSignInStart => createAction(
  USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  { email, password },
));

const signInSuccess = withMatcher((user: UserData & {id: string}): SignInSuccess => createAction(
  USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  user,
));

const signInFailed = withMatcher((error: Error): SignInFailed => createAction(
  USER_ACTION_TYPES.SIGN_IN_FAILED,
  error,
));

// __________ Sign up  __________
const emailSignUpStart = withMatcher((
  email: string,
  password: string,
  displayName: string,
): EmailSignUpStart => createAction(
  USER_ACTION_TYPES.EMAIL_SIGN_UP_START,
  {
    email,
    password,
    displayName,
  },
));

const signUpSuccess = withMatcher((
  user: User,
  additionalDetails: AdditionalInformation,
) => createAction(
  USER_ACTION_TYPES.SIGN_UP_SUCCESS,
  {
    user,
    additionalDetails,
  },
));

const signUpFailed = withMatcher((error: Error): SignUpFailed => createAction(
  USER_ACTION_TYPES.SIGN_UP_FAILED,
  error,
));

// __________ Sign out  __________
const signOutStart = withMatcher((): SignOutStart => createAction(USER_ACTION_TYPES.SIGN_OUT_START));

const signOutSuccess = withMatcher((): SignOutSuccess => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS));

const signOutFailed = withMatcher((error: Error): SignOutFailed => createAction(
  USER_ACTION_TYPES.SIGN_OUT_FAILED,
  error,
));

export {
  setCurrentUser,
  checkUserSession,
  googleSignInStart,
  emailSignInStart,
  signInSuccess,
  signInFailed,
  signUpFailed,
  signUpSuccess,
  emailSignUpStart,
  signOutStart,
  signOutSuccess,
  signOutFailed,
};
