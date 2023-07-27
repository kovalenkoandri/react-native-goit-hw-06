import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { styles } from '../../styles';
import { ValidateInput } from '../../helpers/ValidateInput';
import { CommonRegisterLogin } from '../../helpers/CommonRegisterLogin';
import { WrapperAuth } from '../../helpers/WrapperAuth';
import { authSignUpUser } from '../../redux/auth/authOperations';

export const RegistrationScreen = ({ navigation }) => {
  const {
    inputLoginHandler,
    inputEmailHandler,
    inputPasswordHandler,
    passwordValue,
    emailValue,
    loginValue,
    keyboardHide,
    setIsShowKeyboard,
    isShowKeyboard,
    width,
  } = ValidateInput();

  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(authSignUpUser({ loginValue, emailValue, passwordValue }));
  };
  return (
    <WrapperAuth>
      <Image
        source={require('../../assets/addPhoto.png')}
        style={styles.addPhoto}
      />
      <View style={styles.regTitleWrapper}>
        <Text style={styles.authTitle}>Регистрация</Text>
      </View>
      <TextInput
        placeholder="Логин"
        value={loginValue}
        onChangeText={inputLoginHandler}
        style={{
          ...styles.inputLogin,
          width,
        }}
        onFocus={() => setIsShowKeyboard(true)}
      />
      <CommonRegisterLogin
        {...{
          passwordValue,
          emailValue,
          inputEmailHandler,
          inputPasswordHandler,
          setIsShowKeyboard,
          keyboardHide,
          width,
        }}
      >
        <TouchableOpacity
          style={styles.buttonAuth}
          activeOpacity={0.8}
          // onPress={keyboardHide}
          // onPress={() => navigation.navigate('Home')}
          onPress={handleSubmit}
        >
          <Text style={styles.textAuth}>Зарегистрироваться</Text>
        </TouchableOpacity>
        <Text
          style={(styles.textShow, styles.textRoute)}
          onPress={() => navigation.navigate('Login')}
        >
          Уже есть аккаунт?<Text style={styles.textRouteInner}> Войти</Text>
        </Text>
      </CommonRegisterLogin>
    </WrapperAuth>
  );
};
