import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { store } from './redux/store';
import { useRoute } from './router';
import { auth } from './firebase/config';

export default function App() {
  const [user, setUser] = useState(false);
  const routing = useRoute(user);
  const [fontsLoaded] = useFonts({
    RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(true);
    } else {
      setUser(false);
      // User is signed out
    }
  });

  return <Provider store={store}><NavigationContainer>{routing}</NavigationContainer></Provider>;
}
