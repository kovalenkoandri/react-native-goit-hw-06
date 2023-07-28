import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SvgLogout from '../../helpers/SvgLogout';
import { useDispatch } from 'react-redux';
import { authSignOutUser } from '../../redux/auth/authOperations';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logout}>
        <SvgLogout />
      </TouchableOpacity>
      <Text>ProfileScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
