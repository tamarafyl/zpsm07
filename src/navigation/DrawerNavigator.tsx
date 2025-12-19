import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ResultsScreen from '../screens/ResultsScreen';
import TestScreen from '../screens/TestScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ results, addResult }) {
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: true }}>

      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Ekran Główny' }}
      />

      <Drawer.Screen
        name="Results"
        options={{ title: 'Wyniki' }}
      >
        {props => <ResultsScreen {...props} results={results} />}
      </Drawer.Screen>

      {/* 🔥 Універсальний екран тесту */}
      <Drawer.Screen
        name="Test"
        options={{ title: 'Test' }}
      >
        {props => <TestScreen {...props} addResult={addResult} />}
      </Drawer.Screen>

    </Drawer.Navigator>
  );
}
