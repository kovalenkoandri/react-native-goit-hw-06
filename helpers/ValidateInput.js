import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { Dimensions } from 'react-native';

export const ValidateInput = () => {
  const [loginValue, setLoginValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const inputLoginHandler = (text) => setLoginValue(text);
  const inputEmailHandler = (text) => setEmailValue(text);
  const inputPasswordHandler = (text) => setPasswordValue(text);
  const passHideHandler = (hidePass) => setHidePass(!hidePass);
  const keyboardHide = ({ navigation }) => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
    // console.log(loginValue, emailValue, passwordValue);
    // setLoginValue('');
    // setEmailValue('');
    // setPasswordValue('');
  };
  const [width, setWidth] = useState(Dimensions.get('window').width - 20 * 2);
 useEffect(() => {
   const subscription = Dimensions.addEventListener(
     'change',
     () => {
        setWidth(Dimensions.get('window').width - 20 * 2);
     },
   );
   return () => subscription?.remove();
 });
  return {
    inputLoginHandler,
    inputEmailHandler,
    inputPasswordHandler,
    passHideHandler,
    loginValue,
    emailValue,
    passwordValue,
    hidePass,
    keyboardHide,
    setIsShowKeyboard,
    isShowKeyboard,
    width,
  };
};
