import React, { useEffect } from 'react'
import {
	auth,
	createUserDocumentFromAuth,
	signInWithGooglePopup,
} from '../../utils/database/firebase'
import SignUp from "../sign-up/signUp";
import SignIn from "../sign-in/signIn";
import './authentication.scss'

const Authentication = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup()
		const userFocRef = await createUserDocumentFromAuth(user)
	}

	return (
		<div className={'authentication-container'}>
			<SignIn/>
			<SignUp/>
		</div>
	)
}

export default Authentication
