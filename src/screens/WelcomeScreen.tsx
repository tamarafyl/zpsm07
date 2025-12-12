import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function WelcomeScreen({ onAccept }: { onAccept: () => void }) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Witamy w aplikacji Quiz!</Text>

        <Text style={styles.subtitle}>Regulamin aplikacji</Text>

        <Text style={styles.text}>
          1. Aplikacja służy do testowania wiedzy matematycznej.
        </Text>

        <Text style={styles.text}>
          2. Dostępne są cztery typy testów: dodawanie, odejmowanie, mnożenie i dzielenie.
        </Text>

        <Text style={styles.text}>
          3. Każde pytanie ma limit czasu 30 sekund.
        </Text>

        <Text style={styles.text}>
          4. Za każdą poprawną odpowiedź otrzymujesz 1 punkt.
        </Text>

        <Text style={styles.text}>
          5. Wszystkie wyniki są zapisywane i można je przeglądać w sekcji "Wyniki".
        </Text>

        <Text style={styles.text}>
          6. Korzystanie z aplikacji jest bezpłatne.
        </Text>

        <Text style={styles.footer}>
          Klikając "Akceptuję" potwierdzasz, że zapoznałeś się z regulaminem.
        </Text>
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={onAccept}>
        <Text style={styles.buttonText}>Akceptuję regulamin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 15,
    color: '#555',
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
    color: '#666',
  },
  footer: {
    fontSize: 14,
    marginTop: 30,
    fontStyle: 'italic',
    color: '#888',
  },
  button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    padding: 18,
    alignItems: 'center',
    margin: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});