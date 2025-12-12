import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ResultsScreen from '../screens/ResultsScreen';
import TestScreen from '../screens/TestScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ results, addResult }) {
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Ekran Główny' }} />
      <Drawer.Screen
        name="Results"
        options={{ title: 'Wyniki' }}
      >
        {props => <ResultsScreen {...props} results={results} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Test1"
        options={{ title: 'Test 1' }}
      >
        {props => <TestScreen {...props} testId={1} addResult={addResult} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Test2"
        options={{ title: 'Test 2' }}
      >
        {props => <TestScreen {...props} testId={2} addResult={addResult} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Test3"
        options={{ title: 'Test 3' }}
      >
        {props => <TestScreen {...props} testId={3} addResult={addResult} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Test4"
        options={{ title: 'Test 4' }}
      >
        {props => <TestScreen {...props} testId={4} addResult={addResult} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}