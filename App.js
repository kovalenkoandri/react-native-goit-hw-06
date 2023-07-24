import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { useRoute } from './router';
import { useFonts } from 'expo-font';
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const routing = useRoute(false);
  const [fontsLoaded] = useFonts({
    RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Provider store={store}><NavigationContainer>{routing}</NavigationContainer></Provider>;
}
