import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TestScreen({ navigation }) {
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

  // ============================
  //  ПРИКЛАДОВІ ПИТАННЯ
  // ============================
  const questions = [
    {
      question: "What is the capital of France?",
      answers: ["Paris", "Berlin", "Madrid", "Rome"],
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: ["Earth", "Mars", "Venus", "Jupiter"],
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      answers: ["Shakespeare", "Hemingway", "Tolstoy", "Dickens"],
    },
  ];

  // ============================
  //  СТАН КВІЗУ
  // ============================
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalQuestions = questions.length;
  const currentQuestionNumber = currentIndex + 1;
  const questionData = questions[currentIndex];

  // ============================
  //  ТАЙМЕР
  // ============================
  const [time, setTime] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ============================
  //  ВИБІР ВІДПОВІДІ
  // ============================
  const chooseAnswer = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTime(30); // reset часу на наступне питання
    }
  };

  return (
    <View style={styles.container}>
      {/* Верхній рядок: Question X of Y + Time */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>
          Question {currentQuestionNumber} of {totalQuestions}
        </Text>
        <Text style={styles.headerText}>Time: {time} sec</Text>
      </View>

      {/* Прогрес-бар */}
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${(currentQuestionNumber / totalQuestions) * 100}%` },
          ]}
        />
      </View>

      {/* Текст питання */}
      <Text style={styles.questionText}>{questionData.question}</Text>

      {/* Відповіді */}
      <View style={styles.answersBox}>
        {questionData.answers.map((ans, i) => (
          <TouchableOpacity
            key={i}
            style={styles.answerButton}
            onPress={chooseAnswer}
          >
            <Text style={styles.answerText}>{ans}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  progressBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#eee',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 30,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#444',
  },
  questionText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 25,
  },
  answersBox: {
    marginTop: 20,
  },
  answerButton: {
    paddingVertical: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    alignItems: 'center',
  },
  answerText: {
    fontSize: 18,
  },
});