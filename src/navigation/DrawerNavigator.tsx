import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ResultsScreen from '../screens/ResultsScreen';
import TestScreen from '../screens/TestScreen';


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Ekran Główny' }} />
      <Drawer.Screen name="Results" component={ResultsScreen} options={{ title: 'Wyniki' }} />
      <Drawer.Screen
        name="Test1"
        component={TestScreen}
        initialParams={{ testId: 1 }}
        options={{ title: 'Test 1' }}
      />
      <Drawer.Screen
        name="Test2"
        component={TestScreen}
        initialParams={{ testId: 2 }}
        options={{ title: 'Test 2' }}
      />
      <Drawer.Screen
        name="Test3"
        component={TestScreen}
        initialParams={{ testId: 3 }}
        options={{ title: 'Test 3' }}
      />
    </Drawer.Navigator>
  );
}
