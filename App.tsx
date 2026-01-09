// App.tsx
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import DrawerNavigator from './src/navigation/DrawerNavigator';
import WelcomeScreen from './src/screens/WelcomeScreen';
import SplashScreen from './src/screens/SplashScreen';

import { initTestsLocal, saveTestsLocal, loadTestsLocal } from './src/database/testsLocal';
import { getTests } from './src/services/quizService';

export default function App() {
  const [results, setResults] = useState<any[]>([]);
  const [tests, setTests] = useState<any[]>([]);

  const [showSplash, setShowSplash] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  // 🔵 Monitorowanie internetu
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  // 🔵 Inicjalizacja lokalnej bazy
  useEffect(() => {
    (async () => {
      await initTestsLocal();
    })();
  }, []);

  // 🔵 Sprawdzenie pierwszego uruchomienia
  useEffect(() => {
    AsyncStorage.getItem('hasLaunched').then(value => {
      setIsFirstLaunch(value === null);
    });
  }, []);

  const handleSplashFinish = () => setShowSplash(false);

  const handleAcceptRegulamin = async () => {
    await AsyncStorage.setItem('hasLaunched', 'true');
    setIsFirstLaunch(false);
  };

  // 🔵 Synchronizacja testów z API lub offline fallback
  const syncTests = async () => {
    try {
      // 🔴 Brak internetu → używamy tylko lokalnych testów
      if (!isConnected) {
        console.log('📴 Brak internetu — używam testów lokalnych');
        const localTests = await loadTestsLocal();
        setTests(localTests);
        return;
      }

      // 🔵 Jest internet → sprawdzamy synchronizację
      const lastSync = await AsyncStorage.getItem('lastSync');
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;

      if (!lastSync || now - Number(lastSync) > oneDay) {
        console.log('🌐 Pobieram testy z API...');
        const data = await getTests();
        await saveTestsLocal(data);
        await AsyncStorage.setItem('lastSync', String(now));
        console.log('✅ Testy zapisane lokalnie (AsyncStorage)');
      } else {
        console.log('⏩ Używam testów z lokalnego storage (ostatnia synchronizacja < 24h)');
      }

      const localTests = await loadTestsLocal();
      setTests(localTests);

    } catch (err) {
      console.error('❌ Błąd synchronizacji testów:', err);
    }
  };

  // 🔵 Uruchamiamy synchronizację dopiero po Splash + Welcome + znanym statusie internetu
  useEffect(() => {
    if (!showSplash && isFirstLaunch === false && isConnected !== null) {
      syncTests();
    }
  }, [showSplash, isFirstLaunch, isConnected]);

  // 🔵 Ekrany startowe
  if (showSplash) return <SplashScreen onFinish={handleSplashFinish} />;
  if (isFirstLaunch === null) return null;
  if (isFirstLaunch) return <WelcomeScreen onAccept={handleAcceptRegulamin} />;

  // 🔵 Główna nawigacja
  return (
    <NavigationContainer>
      <DrawerNavigator
        tests={tests}
        results={results}
        addResult={(res) => setResults(prev => [...prev, res])}
      />
    </NavigationContainer>
  );
}
