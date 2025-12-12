import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ResultsScreen({ results = [] }: { results?: Array<{ testId: number, testName: string, points: number, date: string }> }) {
  const navigation = useNavigation();
  const route = useRoute();
  const { score = 0, testId = 1 } = route.params || {};

  const [refreshing, setRefreshing] = useState(false);

  // Drawer завжди працює
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 15 }}>
          <Text style={{ fontSize: 24 }}>☰</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const testNames: Record<number, string> = {
    1: "Dodawanie",
    2: "Odejmowanie",
    3: "Mnożenie",
    4: "Dzielenie"
  };

  // Преобразуємо результати у формат викладача
  const displayResults = results && results.length > 0
    ? results.map(r => ({
        nick: "User", // можеш поставити реальний нік
        score: route.params?.score || 0,
        total: 10, // загальна кількість питань для тесту, або зберігати в TestScreen
        type: testNames[route.params?.testId] || "Unknown",
        date: r.date
      }))
    : [{
        nick: "User",
        score: score,
        total: 10,
        type: testNames[testId] || `Test ${testId}`,
        date: new Date().toLocaleDateString()
      }];


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Тут можна додати логіку оновлення, наприклад перезавантаження з сервера
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results</Text>

      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Nick</Text>
        <Text style={styles.headerCell}>Score</Text>
        <Text style={styles.headerCell}>Total</Text>
        <Text style={styles.headerCell}>Type</Text>
        <Text style={styles.headerCell}>Date</Text>
      </View>

      <FlatList
        data={displayResults}
        keyExtractor={(item, index) => `${item.nick}-${index}`}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.cell}>{item.nick}</Text>
            <Text style={styles.cell}>{item.score}</Text>
            <Text style={styles.cell}>{item.total}</Text>
            <Text style={styles.cell}>{item.type}</Text>
            <Text style={styles.cell}>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, marginBottom: 20, fontWeight: "bold" },
  tableHeader: { flexDirection: "row", borderBottomWidth: 2, paddingBottom: 10, marginBottom: 10 },
  headerCell: { flex: 1, fontWeight: "bold", fontSize: 16 },
  tableRow: { flexDirection: "row", paddingVertical: 8, borderBottomWidth: 1 },
  cell: { flex: 1, fontSize: 16 },
});
