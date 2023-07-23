import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
  ImageBackground,
} from 'react-native';
import { styles } from '../styles';
import { ValidateInput } from './ValidateInput';
export const WrapperAuth = ({ children }) => {
  const { keyboardHide, isShowKeyboard } = ValidateInput();
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground style={styles.bg} source={require('../assets/bg.png')}>
          <View
            style={{
              ...styles.form,
              marginBottom: isShowKeyboard ? -110 : 0,
            }}
          >
            {children}
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
