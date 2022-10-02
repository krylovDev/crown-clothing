import createAction from "../../utils/reducer/reducer.utils";
import USER_ACTION_TYPES from "./user.types";

const setCurrentUser = (user) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)

const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)

const googleSignInStart = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)

const emailSignInStart = (email, password) => createAction(
	USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
	{email, password}
)

const signInSuccess = (user) => createAction(
	USER_ACTION_TYPES.SIGN_IN_SUCCESS,
	user
)

const signInFailed = (error) => createAction(
	USER_ACTION_TYPES.SIGN_IN_FAILED,
	error
)

const emailSignUpStart = (email, password, displayName) => createAction(
	USER_ACTION_TYPES.EMAIL_SIGN_UP_START,
	{
		email,
		password,
		displayName
	}
)

const signUpSuccess = (user, additionalDetails) => createAction(
	USER_ACTION_TYPES.SIGN_UP_SUCCESS,
	{
		user,
		additionalDetails
	}
)

const signUpFailed = (error) => createAction(
	USER_ACTION_TYPES.SIGN_UP_FAILED,
	error
)

const signOutStart = () => createAction(USER_ACTION_TYPES.SIGN_OUT_START)

const signOutSuccess = () => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)

const signOutFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)


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
}
