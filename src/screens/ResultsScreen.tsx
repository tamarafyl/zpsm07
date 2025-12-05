import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function ResultsScreen({ navigation }) {
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

  // прикладові дані
  const results = [
    { id: "1", testNumber: 1, points: 7, date: "2025-12-05" },
    { id: "2", testNumber: 2, points: 9, date: "2025-12-05" },
    { id: "3", testNumber: 3, points: 5, date: "2025-12-05" }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results</Text>

      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Test</Text>
        <Text style={styles.headerCell}>Points</Text>
        <Text style={styles.headerCell}>Date</Text>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.cell}>{item.testNumber}</Text>
            <Text style={styles.cell}>{item.points}</Text>
            <Text style={styles.cell}>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: "bold",
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
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  cell: {
    flex: 1,
    fontSize: 16,
  },
});