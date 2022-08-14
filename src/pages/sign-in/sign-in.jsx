import React, {useState} from 'react'
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup
} from '../../utils/database/firebase'
import FormInput from '../../components/form/input/form-input'
import './sign-in.scss'
import Button from '../../components/button/button'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignIn = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password} = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup()
        const userFocRef = await createUserDocumentFromAuth(user)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password)
            console.log(response)
            resetFormFields()
        } catch ({message, code}) {
            switch (code) {
                case 'auth/user-not-found':
                    return console.error(`Пользователь не найден. ${message}`)
                case 'auth/wrong-password':
                    return console.error(`Имя пользователя или пароль неверны. ${message}`)
                default:
                    return null
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className={'sign-up-container'}>
            <h2>Already have an account?</h2>
            <span>Sign up with your email and password</span>
            <form
                onSubmit={handleSubmit}
            >

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

                <div className={'buttons-container'}>
                    <Button
                        type={'submit'}
                    >Sign In
                    </Button>

                    <Button
                        type={'button'}
                        buttonType={'google'}
                        onClick={signInWithGoogle}
                    >Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignIn
