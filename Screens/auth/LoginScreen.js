import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useState } from 'react';
import { styles } from '../../styles';
import { ValidateInput } from '../../helpers/ValidateInput';
import { CommonRegisterLogin } from '../../helpers/CommonRegisterLogin';
import { WrapperAuth } from '../../helpers/WrapperAuth';
import React from 'react';

export const LoginScreen = ({ navigation }) => {
  const {
    inputEmailHandler,
    inputPasswordHandler,
    passwordValue,
    emailValue,
    keyboardHide,
    setIsShowKeyboard,
    isShowKeyboard,
    width,
  } = ValidateInput();
  return (
    <WrapperAuth>
      <View style={styles.logTitleWrapper}>
        <Text style={styles.authTitle}>Войти</Text>
      </View>
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
          onPress={()=> navigation.navigate('Home')}
        >
          <Text style={styles.textAuth}>Войти</Text>
        </TouchableOpacity>
      </CommonRegisterLogin>
      <Text
        onPress={() => navigation.navigate('Registration')}
        style={(styles.textShow, styles.textRoute)}
      >
        Нет аккаунта?
        <Text style={styles.textRouteInner}> Зарегистрироваться</Text>
      </Text>
    </WrapperAuth>
  );
};
