import {
	takeLatest,
	all,
	call,
	put
} from 'redux-saga/effects'
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
	getCurrentUser,
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup, signOutUser
} from "../../utils/database/firebase";
import {
	signInFailed,
	signInSuccess,
	signOutFailed,
	signOutSuccess,
	signUpFailed,
	signUpSuccess
} from "./user.actions";
import { USER_ACTION_TYPES } from "./user.types";

/* ____________________ SIGN-UP ____________________ */

function* signUp(
	{
		payload: {
			email,
			password,
			displayName
		}
	}) {
	try {
		const {user} = yield call(createAuthUserWithEmailAndPassword, email, password)
		yield put(signUpSuccess(user, {displayName}))
		// yield call(createUserDocumentFromAuth, user)
	} catch (error) {
		yield put(signUpFailed(error))
	}
}

function* onSignUpStart() {
	yield takeLatest(
		USER_ACTION_TYPES.EMAIL_SIGN_UP_START,
		signUp
	)
}

function* signInAfterSignUp(
	{
		payload: {
			user,
			additionalDetails
		}
	}
) {
	yield call(getSnapshotFromUserAuth, user)
}

function* onSignUpSuccess() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}
/* ____________________ SIGN-IN ____________________ */
function* getSnapshotFromUserAuth(userAuth, additionalInformation) {
	try {
		const userSnapshot = yield call(
			createUserDocumentFromAuth,
			userAuth,
			additionalInformation,
		)
		yield put(signInSuccess({
			id: userSnapshot.id,
			...userSnapshot.data()
		}))
	} catch (error) {
		yield put(signInFailed(error))
	}
}

/* ____________________ SIGN-IN with GOOGLE ____________________ */
function* signInWithGoogle() {
	try {
		const {user} = yield call(signInWithGooglePopup)
		console.log('user', user)
		yield call(getSnapshotFromUserAuth, user)
	} catch (error) {
		yield put(signInFailed(error))
	}
}

function* onGoogleSignInStart() {
	yield takeLatest(
		USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,
		signInWithGoogle
	)
}

/* ____________________ SIGN-IN with EMAIL ____________________ */
function* signInWithEmail(
	{
		payload:
			{
				email,
				password
			}
	}) {
	try {
		const {user} = yield call(signInAuthUserWithEmailAndPassword, email, password)
		yield call(getSnapshotFromUserAuth, user)
	} catch (error) {
		yield put(signInFailed(error))
	}
}

function* onEmailSignInStart() {
	yield takeLatest(
		USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
		signInWithEmail
	)
}

/* ____________________ CHECK AUTH ____________________ */
function* isUsersAuth() {
	try {
		const userAuth = yield call(getCurrentUser)
		if (!userAuth) return
		yield call(getSnapshotFromUserAuth, userAuth)
	} catch (error) {
		yield put(signInFailed(error))
	}
}

/* ____________________ SIGN_OUT ____________________ */
function* signOut() {
	try {
		yield call(signOutUser)
		yield put(signOutSuccess())
	} catch (error) {
		signOutFailed(error)
	}
}

function* onSignOutStart() {
	yield takeLatest(
		USER_ACTION_TYPES.SIGN_OUT_START,
		signOut
	)
}

function* onCheckUserSession() {
	yield takeLatest(
		USER_ACTION_TYPES.CHECK_USER_SESSION,
		isUsersAuth
	)
}

function* usersSagas() {
	yield all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignOutStart),
	])
}

export default usersSagas
