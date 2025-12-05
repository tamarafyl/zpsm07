import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const drawerNavigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => drawerNavigation.openDrawer()} style={{ marginLeft: 15 }}>
          <Text style={{ fontSize: 24 }}>☰</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, drawerNavigation]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Test1')}
        >
          <Text style={styles.buttonText}>Title test #1</Text>
          <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Test2')}
        >
          <Text style={styles.buttonText}>Title test #2</Text>
          <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Test3')}
        >
          <Text style={styles.buttonText}>Title test #3</Text>
          <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Test4')}
        >
          <Text style={styles.buttonText}>Title test #4</Text>
          <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        </TouchableOpacity>
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
  },
  desc: {
    fontSize: 14,
    marginTop: 6,
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
  },
});