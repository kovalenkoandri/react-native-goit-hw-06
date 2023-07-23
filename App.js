import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

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

  return <NavigationContainer>{routing}</NavigationContainer>;
}
