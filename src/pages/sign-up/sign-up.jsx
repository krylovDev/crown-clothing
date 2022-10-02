import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { emailSignUpStart } from "../../store/user/user.actions";

import FormInput from '../../components/form/input/FormInput'
import './sign-up.scss'
import Button from '../../components/button/button'

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
}

const SignUp = () => {
	const dispatch = useDispatch()
	const [formFields, setFormFields] = useState(defaultFormFields)
	const {displayName, email, password, confirmPassword} = formFields

	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (password !== confirmPassword) return

		try {
			dispatch(emailSignUpStart(email, password, displayName))
			resetFormFields()
		} catch ({message, code}) {
			if (code === 'auth/email-already-in-use') {
				console.error('Пользователь с такой почтой уже существует')
			} else {
				console.error(`Произошла ошибка при создании пользователя! Ошибка ${message}`)
			}
		}
	}

	const handleChange = (event) => {
		const {name, value} = event.target
		setFormFields({...formFields, [name]: value})
	}

	return (
		<div className={'sign-up-container'}>
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form
				onSubmit={handleSubmit}
			>

				<FormInput
					label={'DisplayName'}
					name={'displayName'}
					type="text"
					required
					value={displayName}
					onChange={handleChange}
				/>

				<FormInput
					label={'Email'}
					name={'email'}
					type="email"
					required
					value={email}
					onChange={handleChange}
				/>

				<FormInput
					label={'Password'}
					name={'password'}
					type="password"
					required
					value={password}
					onChange={handleChange}
				/>

				<FormInput
					label={'ConfirmPassword'}
					name={'confirmPassword'}
					type="password"
					required
					value={confirmPassword}
					onChange={handleChange}
				/>

				<Button
					type={'submit'}
				>Sign Up</Button>
			</form>
		</div>
	)
}

export default SignUp
