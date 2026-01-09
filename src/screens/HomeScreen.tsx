// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';

export default function HomeScreen({ navigation, tests: initialTests }) {
  const drawerNavigation = useNavigation();
  const [tests, setTests] = useState(initialTests || []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => drawerNavigation.openDrawer()} style={{ marginLeft: 15 }}>
          <Text style={{ fontSize: 24, fontFamily: 'Roboto-Regular' }}>☰</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, drawerNavigation]);

  useEffect(() => {
    setTests(_.shuffle(initialTests || []));
  }, [initialTests]);

  useFocusEffect(
    React.useCallback(() => {
      setTests(prev => _.shuffle(prev));
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <FlatList
          data={tests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => drawerNavigation.navigate('Test', { id: item.id })}
            >
              <Text style={styles.buttonText}>{item.name}</Text>
              <Text style={styles.desc}>
                {(Array.isArray(item.tags) ? item.tags : []).join(', ')}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity
        style={styles.footer}
        onPress={() => navigation.navigate('Results')}
      >
        <Text style={styles.footerText}>Przejdź do wyników</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  buttonsContainer: {
    marginTop: 40,
  },
  button: {
    padding: 16,
    backgroundColor: '#ddd',
    marginBottom: 20,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
  },
  desc: {
    fontSize: 14,
    marginTop: 6,
    fontFamily: 'SplineSansMono-Regular',
  },
  footer: {
    padding: 16,
    backgroundColor: '#ccc',
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
});
