import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import { ValidateInput } from '../helpers/ValidateInput';
export const CommonRegisterLogin = ({
  children,
  passwordValue,
  emailValue,
  inputEmailHandler,
  inputPasswordHandler,
  setIsShowKeyboard,
  width,
}) => {
  const { passHideHandler, hidePass } = ValidateInput();
  return (
    <>
      <TextInput
        placeholder="Адрес электронной почты"
        value={emailValue}
        onChangeText={inputEmailHandler}
        style={{
          ...styles.inputEmail,
          width,
        }}
        onFocus={() => setIsShowKeyboard(true)}
      />
      <View
        style={{
          ...styles.inputPasswordWrapper,
          width,
        }}
      >
        <TextInput
          placeholder="Пароль"
          value={passwordValue}
          onChangeText={inputPasswordHandler}
          style={{
            ...styles.inputPassword,
            width,
          }}
          secureTextEntry={hidePass ? true : false}
          onFocus={() => setIsShowKeyboard(true)}
        />
        <TouchableOpacity
          style={styles.buttonShow}
          activeOpacity={0.8}
          onPress={() => passHideHandler(hidePass)}
        >
          <Text style={styles.textShow}>{hidePass ? 'Show' : 'Hide'}</Text>
        </TouchableOpacity>
      </View>
      {children}
    </>
  );
};
