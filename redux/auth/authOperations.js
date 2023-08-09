import { auth } from '../../firebase/config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { authSlice } from './authReducer';

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

const authUpdateUser = (dispatch) => {
  const userUpdated = auth.currentUser;
  if (userUpdated !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = userUpdated.displayName;
    const uid = userUpdated.uid;
    const userUpdateProfile = {
      nick: displayName,
      userId: uid,
    };

    dispatch(updateUserProfile(userUpdateProfile));
  }
};

export const authSignInUser =
  ({ emailValue, passwordValue }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(
        auth,
        emailValue,
        passwordValue,
      );
      authUpdateUser(dispatch);
    } catch (error) {
      console.log('authSignInUser error ', error);
      console.log('authSignInUser error.message ', error.message);
    }
  };

export const authSignUpUser =
  ({ loginValue, emailValue, passwordValue }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
      await updateProfile(auth.currentUser, {
        displayName: loginValue,
      });
      authUpdateUser(dispatch);
    } catch (error) {
      console.log('authSignUpUser error ', error);
      console.log('authSignUpUser error.message ', error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    console.log('authSignOutUser error ', error);
    console.log('authSignOutUser error.message ', error.message);
  }
};

export const authStateChangeUser = () => (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      authUpdateUser(dispatch);
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};
