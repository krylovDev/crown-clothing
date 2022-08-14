import React, { useEffect } from 'react'
import {
	auth,
	createUserDocumentFromAuth,
	signInWithGooglePopup,
} from '../../utils/database/firebase'
import SignUp from "../sign-up/sign-up";
import SignIn from "../sign-in/sign-in";
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
