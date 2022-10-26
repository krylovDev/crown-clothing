import React, {
  ChangeEvent, ChangeEventHandler, FormEvent, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { BUTTON_TYPE_CLASSES } from 'src/components/button/BUTTON_TYPE_CLASSES';
import {
  SignInContainer,
  ButtonsContainer,
} from './signIn.styles';
import {
  emailSignInStart,
  googleSignInStart,
} from '../../store/user/user.actions';
import FormInput from '../../components/form/input/FormInput';
import Button from '../../components/button/button';

const defaultFormFields = {
  email: '',
  password: '',
};

function SignIn() {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = () => dispatch(googleSignInStart());

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch ({ message, code }) {
      switch (code) {
        case 'auth/user-not-found':
          return console.error(`Пользователь не найден. ${message}`);
        case 'auth/wrong-password':
          return console.error(`Имя пользователя или пароль неверны. ${message}`);
        default:
          return null;
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value,
    } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign up with your email and password</span>
      <form
        onSubmit={handleSubmit}
      >

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

        <ButtonsContainer>
          <Button
            type="submit"
          >
            Sign In
          </Button>

          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
}

export default SignIn;
