import {User} from 'firebase/auth'
import {AdditionalInformation} from '../../utils/database/firebase.types'
import {
	takeLatest,
	all,
	call,
	put
} from 'typed-redux-saga/macro' /*'redux-saga/effects'*/
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
	getCurrentUser,
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
	signOutUser
} from "../../utils/database/firebase";
import {
	signInFailed,
	signInSuccess,
	signOutFailed,
	signOutSuccess,
	signUpFailed,
	signUpSuccess
} from "./user.actions";
import {EmailSignInStart, EmailSignUpStart, SignUpSuccess, USER_ACTION_TYPES} from "./user.types";

/* ____________________ SIGN-IN ____________________ */
function* getSnapshotFromUserAuth(
	userAuth: User,
	additionalInformation?: AdditionalInformation
) {
	try {
		const userSnapshot = yield* call(
			createUserDocumentFromAuth,
			userAuth,
			additionalInformation,
		)
		if (userSnapshot) {
			yield* put(signInSuccess({
				id: userSnapshot.id,
				...userSnapshot.data()
			}))
		}

	} catch (error) {
		yield* put(signInFailed(error as Error))
	}
}

/* ____________________ SIGN-UP ____________________ */

function* signUp(
	{
		payload: {
			email,
			password,
			displayName
		}
	}: EmailSignUpStart) {
	try {
		const userCredential = yield* call(
			createAuthUserWithEmailAndPassword,
			email,
			password
		)
		if (userCredential){
			const {user} = userCredential
			yield* put(signUpSuccess(user, {displayName}))
		}
		// yield* call(createUserDocumentFromAuth, user)
	} catch (error) {
		yield* put(signUpFailed(error as Error))
	}
}

function* onSignUpStart() {
	yield* takeLatest(
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
	}: SignUpSuccess
) {
	yield* call(getSnapshotFromUserAuth, user)
}

function* onSignUpSuccess() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}


/* ____________________ SIGN-IN with GOOGLE ____________________ */
function* signInWithGoogle() {
	try {
		const {user} = yield* call(signInWithGooglePopup)
		console.log('user', user)
		yield* call(getSnapshotFromUserAuth, user)
	} catch (error) {
		yield* put(signInFailed(error as Error))
	}
}

function* onGoogleSignInStart() {
	yield* takeLatest(
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
	}: EmailSignInStart) {
	try {
		const userCredential = yield* call(
			signInAuthUserWithEmailAndPassword,
			email,
			password
		)
		if (userCredential) {
			const {user} = userCredential
			yield* call(getSnapshotFromUserAuth, user)
		}
	} catch (error) {
		yield* put(signInFailed(error as Error))
	}
}

function* onEmailSignInStart() {
	yield* takeLatest(
		USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
		signInWithEmail
	)
}

/* ____________________ CHECK AUTH ____________________ */
function* isUsersAuth() {
	try {
		const userAuth = yield* call(getCurrentUser)
		if (!userAuth) return
		yield* call(getSnapshotFromUserAuth, userAuth)
	} catch (error) {
		yield* put(signInFailed(error as Error))
	}
}

/* ____________________ SIGN_OUT ____________________ */
function* signOut() {
	try {
		yield* call(signOutUser)
		yield* put(signOutSuccess())
	} catch (error) {
		signOutFailed(error as Error)
	}
}

function* onSignOutStart() {
	yield* takeLatest(
		USER_ACTION_TYPES.SIGN_OUT_START,
		signOut
	)
}

function* onCheckUserSession() {
	yield* takeLatest(
		USER_ACTION_TYPES.CHECK_USER_SESSION,
		isUsersAuth
	)
}

function* usersSagas() {
	yield* all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignOutStart),
	])
}

export default usersSagas
