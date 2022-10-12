import {AdditionalInformation, UserData} from '../../utils/database/firebase.types'
import {
	Action,
	ActionWithPayload
} from '../../utils/reducer/reducer.utils.types'


export enum USER_ACTION_TYPES {
	SET_CURRENT_USER = 'user/SET_CURRENT_USER',
	CHECK_USER_SESSION = 'user/CHECK_USER_SESSION',
	GOOGLE_SIGN_IN_START = 'user/GOOGLE_SIGN_IN_START',
	EMAIL_SIGN_IN_START = 'user/EMAIL_SIGN_IN_START',
	SIGN_IN_SUCCESS = 'user/SIGN_IN_SUCCESS',
	SIGN_IN_FAILED = 'user/SIGN_IN_FAILED',
	EMAIL_SIGN_UP_START = 'user/EMAIL_SIGN_UP_START',
	SIGN_UP_SUCCESS = 'user/SIGN_UP_SUCCESS',
	SIGN_UP_FAILED = 'user/SIGN_UP_FAILED',
	SIGN_OUT_START = 'user/SIGN_OUT_START',
	SIGN_OUT_SUCCESS = 'user/SIGN_OUT_SUCCESS',
	SIGN_OUT_FAILED = 'user/SIGN_OUT_FAILED',
}

// __________ DATA STRUCTURE  __________
export interface UserState {
	readonly currentUser: UserData | null,
	readonly isLoading: boolean,
	readonly error: Error | null
}

// __________ ACTIONS  __________
export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>

export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData>

// __________ Sign in  __________
export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>

export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, UserData>

export type SignInFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILED, Error>

export type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email: string, password: string}>

// __________ Sign up  __________
export type EmailSignUpStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_UP_START, {
	email: string,
	password: string,
	displayName: string
}>

export type SignUpSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_SUCCESS, {
	user: UserData,
	additionalDetails: AdditionalInformation
}>

export type SignUpFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAILED, Error>

// __________ Sign out  __________
export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>

export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>

export type SignOutFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAILED, Error>
