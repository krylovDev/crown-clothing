import React, { useEffect } from 'react'
import {
	auth,
	createUserDocumentFromAuth,
	signInWithGooglePopup,
} from '../../utils/database/firebase'

const SignIn = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup()
		const userFocRef = await createUserDocumentFromAuth(user)
	}

	return (
		<div>
			<h1>sign-in</h1>

			<button onClick={ logGoogleUser }>
				sign in with google
			</button>

		</div>
	)
}

export default SignIn
