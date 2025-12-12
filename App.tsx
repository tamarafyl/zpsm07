import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import WelcomeScreen from './src/screens/WelcomeScreen';
import SplashScreen from './src/screens/SplashScreen';

export default function App() {
  // Głobálny stan rezultatów
  const [results, setResults] = useState<Array<{ testId: number, testName: string, points: number, date: string }>>([]);

  // Stan dla splash screen'u
  const [showSplash, setShowSplash] = useState(true);

  // Stан для perewírki czy pervyy zapusk
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    // Perewírka czy to pervyy zapusk
    AsyncStorage.getItem('hasLaunched').then(value => {
      if (value === null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const handleAcceptRegulamin = async () => {
    // Zberigayemo scho korystuvalch uzhe bachyy regulamin
    await AsyncStorage.setItem('hasLaunched', 'true');
    setIsFirstLaunch(false);
  };

  // Pokazuyemo splash screen pervyye 3 sekundy
  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  // Pokazuyemo loader poky perevíryayemo
  if (isFirstLaunch === null) {
    return null;
  }

  // Yakscho pervyy zapusk - pokazuyemo WelcomeScreen
  if (isFirstLaunch) {
    return <WelcomeScreen onAccept={handleAcceptRegulamin} />;
  }

  // Inaksche pokazuyemo osnovnyy dodatok
  return (
    <NavigationContainer>
      <DrawerNavigator results={results} addResult={(res) => setResults(prev => [...prev, res])} />
    </NavigationContainer>
  );
}