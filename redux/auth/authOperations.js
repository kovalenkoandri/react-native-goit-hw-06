import { db } from '../../firebase/config';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const auth = getAuth(db);

export const authSignInUser =
  ({ emailValue, passwordValue }) =>
  async (dispatch, getState) => {
    try {
      console.log(emailValue, passwordValue);
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
      console.log(emailValue, passwordValue);
      const user = await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
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
