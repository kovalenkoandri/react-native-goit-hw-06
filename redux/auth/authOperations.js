import { auth } from '../../firebase/config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

export const authSignInUser =
  ({ emailValue, passwordValue }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        emailValue,
        passwordValue,
      );
    } catch (error) {
      console.log('authSignInUser error ', error);
      console.log('authSignInUser error.message ', error.message);
    }
  };

export const authSignUpUser =
  ({ loginValue, emailValue, passwordValue }) =>
  async (dispatch, getState) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        emailValue,
        passwordValue,
      );
    } catch (error) {
      console.log('authSignUpUser error ', error);
      console.log('authSignUpUser error.message ', error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
  } catch (error) {
    console.log('authSignOutUser error ', error);
    console.log('authSignOutUser error.message ', error.message);
  }
};
