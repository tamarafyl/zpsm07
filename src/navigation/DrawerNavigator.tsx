// src/navigation/DrawerNavigator.tsx
import React, { useEffect, useState } from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import _ from 'lodash';

import HomeScreen from '../screens/HomeScreen';
import ResultsScreen from '../screens/ResultsScreen';
import TestScreen from '../screens/TestScreen';

import { getTests } from '../services/quizService';
import { saveTestsLocal, loadTestsLocal } from '../database/testsLocal';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ tests, results, addResult }) {
  const navigation = useNavigation();
  const [localTests, setLocalTests] = useState(tests);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  // 🔵 Monitorowanie internetu
  useEffect(() => {
    const unsub = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    setLocalTests(_.shuffle(tests));
  }, [tests]);

  useFocusEffect(
    React.useCallback(() => {
      setLocalTests(prev => _.shuffle(prev));
    }, [])
  );

  const handleRefreshTests = async () => {
    try {
      if (!isConnected) {
        console.warn('📴 Brak internetu — nie mogę pobrać nowych testów.');
        return;
      }

      const data = await getTests();
      await saveTestsLocal(data);
      const updatedLocal = await loadTestsLocal();
      setLocalTests(_.shuffle(updatedLocal));
      console.log('🔄 Zaktualizowano testy, liczba:', updatedLocal.length);
    } catch (err) {
      console.error('Błąd odświeżania testów:', err);
    }
  };

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: true }}
      drawerContent={(props) => (
        <DrawerContentWrapper {...props} tests={localTests} />
      )}
    >
      <Drawer.Screen name="Home" options={{ title: 'Ekran Główny' }}>
        {props => <HomeScreen {...props} tests={localTests} />}
      </Drawer.Screen>

      <Drawer.Screen name="Results" options={{ title: 'Wyniki' }}>
        {props => <ResultsScreen {...props} results={results} />}
      </Drawer.Screen>

      <Drawer.Screen
        name="Test"
        options={{ drawerItemStyle: { height: 0 } }}
      >
        {props => <TestScreen {...props} addResult={addResult} />}
      </Drawer.Screen>

      <Drawer.Screen
        name="WylosujTest"
        options={{
          title: 'Wylosuj test',
          drawerLabel: () => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                try {
                  if (!localTests || localTests.length === 0) {
                    console.warn('Brak testów w lokalnej bazie.');
                    return;
                  }
                  const random =
                    localTests[Math.floor(Math.random() * localTests.length)];
                  navigation.navigate('Test', { id: random.id });
                } catch (err) {
                  console.error('Błąd losowania testu:', err);
                }
              }}
            >
              <Text style={styles.text}>🎲 Wylosuj test</Text>
            </TouchableOpacity>
          ),
        }}
      >
        {() => <View />}
      </Drawer.Screen>

      <Drawer.Screen
        name="OdswiezTesty"
        options={{
          title: 'Odśwież testy',
          drawerLabel: () => (
            <TouchableOpacity style={styles.button} onPress={handleRefreshTests}>
              <Text style={styles.text}>🔄 Pobierz najnowsze testy</Text>
            </TouchableOpacity>
          ),
        }}
      >
        {() => <View />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

function DrawerContentWrapper(props) {
  return <CustomDrawer {...props} />;
}

function CustomDrawer(props) {
  const { navigation, tests } = props;

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      <Text style={styles.section}>Dostępne testy:</Text>

      {tests.map(test => (
        <TouchableOpacity
          key={test.id}
          style={styles.button}
          onPress={() => navigation.navigate('Test', { id: test.id })}
        >
          <Text style={styles.text}>{test.name}</Text>
          <Text style={styles.tags}>
            {(Array.isArray(test.tags) ? test.tags : []).join(', ')}
          </Text>
        </TouchableOpacity>
      ))}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    fontSize: 18,
    margin: 10,
    fontFamily: 'Roboto-Bold',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  tags: {
    fontSize: 12,
    fontFamily: 'SplineSansMono-Regular',
  },
});
