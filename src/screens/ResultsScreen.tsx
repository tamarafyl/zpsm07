import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ResultsScreen() {
  const navigation = useNavigation();

  const [results, setResults] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 15 }}>
          <Text style={{ fontSize: 24, fontFamily: "Roboto-Regular" }}>☰</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const fetchResults = async () => {
    try {
      const response = await fetch("https://tgryl.pl/quiz/results?last=20");
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Błąd pobierania wyników:", error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchResults().finally(() => setRefreshing(false));
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
        data={results}
        keyExtractor={(item, index) => `${item.nick}-${index}`}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.cell}>{item.nick}</Text>
            <Text style={styles.cell}>{item.score}</Text>
            <Text style={styles.cell}>{item.total}</Text>
            <Text style={styles.cell}>{item.type}</Text>
            <Text style={styles.cell}>{item.createdOn}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: "bold",
    fontFamily: "Roboto-Bold",
  },

  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    paddingBottom: 10,
    marginBottom: 10,
  },

  headerCell: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Roboto-Bold",
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
  },

  cell: {
    flex: 1,
    fontSize: 16,
    fontFamily: "SplineSansMono-Regular",
  },
});
