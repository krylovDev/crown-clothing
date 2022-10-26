import firebase from 'firebase/compat';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  AuthError,
  AuthErrorCodes,
} from 'firebase/auth';
import { emailSignUpStart } from '../../store/user/user.actions';
import FormInput from '../../components/form/input/FormInput';
import Button from '../../components/button/button';
import { SignUpContainer } from './signUp.styles';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function SignUp() {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {
    displayName, email, password, confirmPassword,
  } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) return;

    try {
      dispatch(emailSignUpStart(email, password, displayName));
      resetFormFields();
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        console.error('Пользователь с такой почтой уже существует');
      } else {
        console.error(`Произошла ошибка при создании пользователя! Ошибка ${error}`);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Don"t have an account?</h2>
      <span>Sign up with your email and password</span>
      <form
        onSubmit={handleSubmit}
      >

        <FormInput
          label="DisplayName"
          name="displayName"
          type="text"
          required
          value={displayName}
          onChange={handleChange}
        />

        <FormInput
          label="Email"
          name="email"
          type="email"
          required
          value={email}
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          required
          value={password}
          onChange={handleChange}
        />

        <FormInput
          label="ConfirmPassword"
          name="confirmPassword"
          type="password"
          required
          value={confirmPassword}
          onChange={handleChange}
        />

        <Button
          type="submit"
        >
          Sign Up
        </Button>
      </form>
    </SignUpContainer>
  );
}

export default SignUp;
