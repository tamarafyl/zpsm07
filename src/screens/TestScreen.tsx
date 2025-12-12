import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

export default function TestScreen({ navigation, testId, addResult }) {
  const drawerNavigation = useNavigation();
  const route = useRoute();

  // ============================
  //  НАЗВИ ТЕСТІВ
  // ============================
  const testNames = {
    1: "Dodawanie",
    2: "Odejmowanie",
    3: "Mnożenie",
    4: "Dzielenie"
  };

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
  //  ПИТАННЯ ДЛЯ ТЕСТІВ
  // ============================
const tasks  = {
  1: [
    {
      question: "5 + 3 = ?",
      duration: 30,
      answers: [
        { content: "8", isCorrect: true },
        { content: "9", isCorrect: false },
        { content: "7", isCorrect: false },
        { content: "6", isCorrect: false }
      ]
    },
    {
      question: "12 + 7 = ?",
      duration: 30,
      answers: [
        { content: "19", isCorrect: true },
        { content: "18", isCorrect: false },
        { content: "20", isCorrect: false },
        { content: "17", isCorrect: false }
      ]
    },
    {
      question: "8 + 15 = ?",
      duration: 30,
      answers: [
        { content: "23", isCorrect: true },
        { content: "22", isCorrect: false },
        { content: "24", isCorrect: false },
        { content: "21", isCorrect: false }
      ]
    },
    {
      question: "7 + 6 = ?",
      duration: 30,
      answers: [
        { content: "13", isCorrect: true },
        { content: "12", isCorrect: false },
        { content: "14", isCorrect: false },
        { content: "15", isCorrect: false }
      ]
    },
    {
      question: "9 + 4 = ?",
      duration: 30,
      answers: [
        { content: "13", isCorrect: true },
        { content: "12", isCorrect: false },
        { content: "14", isCorrect: false },
        { content: "15", isCorrect: false }
      ]
    },
    {
      question: "11 + 8 = ?",
      duration: 30,
      answers: [
        { content: "19", isCorrect: true },
        { content: "20", isCorrect: false },
        { content: "18", isCorrect: false },
        { content: "21", isCorrect: false }
      ]
    },
    {
      question: "6 + 9 = ?",
      duration: 30,
      answers: [
        { content: "15", isCorrect: true },
        { content: "14", isCorrect: false },
        { content: "16", isCorrect: false },
        { content: "13", isCorrect: false }
      ]
    },
    {
      question: "3 + 17 = ?",
      duration: 30,
      answers: [
        { content: "20", isCorrect: true },
        { content: "21", isCorrect: false },
        { content: "19", isCorrect: false },
        { content: "18", isCorrect: false }
      ]
    },
    {
      question: "14 + 5 = ?",
      duration: 30,
      answers: [
        { content: "19", isCorrect: true },
        { content: "20", isCorrect: false },
        { content: "18", isCorrect: false },
        { content: "21", isCorrect: false }
      ]
    },
    {
      question: "10 + 10 = ?",
      duration: 30,
      answers: [
        { content: "20", isCorrect: true },
        { content: "19", isCorrect: false },
        { content: "21", isCorrect: false },
        { content: "18", isCorrect: false }
      ]
    }
  ],

  2: [
    {
      question: "15 - 7 = ?",
      duration: 30,
      answers: [
        { content: "8", isCorrect: true },
        { content: "9", isCorrect: false },
        { content: "7", isCorrect: false },
        { content: "6", isCorrect: false }
      ]
    },
    {
      question: "20 - 13 = ?",
      duration: 30,
      answers: [
        { content: "7", isCorrect: true },
        { content: "6", isCorrect: false },
        { content: "8", isCorrect: false },
        { content: "9", isCorrect: false }
      ]
    },
    {
      question: "18 - 9 = ?",
      duration: 30,
      answers: [
        { content: "9", isCorrect: true },
        { content: "8", isCorrect: false },
        { content: "10", isCorrect: false },
        { content: "7", isCorrect: false }
      ]
    },
    {
      question: "14 - 6 = ?",
      duration: 30,
      answers: [
        { content: "8", isCorrect: true },
        { content: "7", isCorrect: false },
        { content: "9", isCorrect: false },
        { content: "6", isCorrect: false }
      ]
    },
    {
      question: "25 - 10 = ?",
      duration: 30,
      answers: [
        { content: "15", isCorrect: true },
        { content: "14", isCorrect: false },
        { content: "16", isCorrect: false },
        { content: "13", isCorrect: false }
      ]
    },
    {
      question: "30 - 12 = ?",
      duration: 30,
      answers: [
        { content: "18", isCorrect: true },
        { content: "17", isCorrect: false },
        { content: "19", isCorrect: false },
        { content: "16", isCorrect: false }
      ]
    },
    {
      question: "9 - 3 = ?",
      duration: 30,
      answers: [
        { content: "6", isCorrect: true },
        { content: "5", isCorrect: false },
        { content: "7", isCorrect: false },
        { content: "4", isCorrect: false }
      ]
    },
    {
      question: "17 - 8 = ?",
      duration: 30,
      answers: [
        { content: "9", isCorrect: true },
        { content: "8", isCorrect: false },
        { content: "10", isCorrect: false },
        { content: "7", isCorrect: false }
      ]
    },
    {
      question: "22 - 11 = ?",
      duration: 30,
      answers: [
        { content: "11", isCorrect: true },
        { content: "10", isCorrect: false },
        { content: "12", isCorrect: false },
        { content: "9", isCorrect: false }
      ]
    },
    {
      question: "13 - 7 = ?",
      duration: 30,
      answers: [
        { content: "6", isCorrect: true },
        { content: "5", isCorrect: false },
        { content: "7", isCorrect: false },
        { content: "8", isCorrect: false }
      ]
    }
  ],

  3: [
    {
      question: "3 × 4 = ?",
      duration: 30,
      answers: [
        { content: "12", isCorrect: true },
        { content: "11", isCorrect: false },
        { content: "13", isCorrect: false },
        { content: "10", isCorrect: false }
      ]
    },
    {
      question: "6 × 7 = ?",
      duration: 30,
      answers: [
        { content: "42", isCorrect: true },
        { content: "41", isCorrect: false },
        { content: "43", isCorrect: false },
        { content: "40", isCorrect: false }
      ]
    },
    {
      question: "5 × 8 = ?",
      duration: 30,
      answers: [
        { content: "40", isCorrect: true },
        { content: "39", isCorrect: false },
        { content: "41", isCorrect: false },
        { content: "38", isCorrect: false }
      ]
    },
    {
      question: "9 × 3 = ?",
      duration: 30,
      answers: [
        { content: "27", isCorrect: true },
        { content: "26", isCorrect: false },
        { content: "28", isCorrect: false },
        { content: "25", isCorrect: false }
      ]
    },
    {
      question: "7 × 6 = ?",
      duration: 30,
      answers: [
        { content: "42", isCorrect: true },
        { content: "41", isCorrect: false },
        { content: "43", isCorrect: false },
        { content: "40", isCorrect: false }
      ]
    },
    {
      question: "4 × 5 = ?",
      duration: 30,
      answers: [
        { content: "20", isCorrect: true },
        { content: "19", isCorrect: false },
        { content: "21", isCorrect: false },
        { content: "18", isCorrect: false }
      ]
    },
    {
      question: "8 × 2 = ?",
      duration: 30,
      answers: [
        { content: "16", isCorrect: true },
        { content: "15", isCorrect: false },
        { content: "17", isCorrect: false },
        { content: "14", isCorrect: false }
      ]
    },
    {
      question: "12 × 3 = ?",
      duration: 30,
      answers: [
        { content: "36", isCorrect: true },
        { content: "35", isCorrect: false },
        { content: "37", isCorrect: false },
        { content: "34", isCorrect: false }
      ]
    },
    {
      question: "9 × 5 = ?",
      duration: 30,
      answers: [
        { content: "45", isCorrect: true },
        { content: "44", isCorrect: false },
        { content: "46", isCorrect: false },
        { content: "43", isCorrect: false }
      ]
    },
    {
      question: "10 × 4 = ?",
      duration: 30,
      answers: [
        { content: "40", isCorrect: true },
        { content: "39", isCorrect: false },
        { content: "41", isCorrect: false },
        { content: "38", isCorrect: false }
      ]
    }
  ],

  4: [
    {
      question: "12 ÷ 4 = ?",
      duration: 30,
      answers: [
        { content: "3", isCorrect: true },
        { content: "2", isCorrect: false },
        { content: "4", isCorrect: false },
        { content: "5", isCorrect: false }
      ]
    },
    {
      question: "20 ÷ 5 = ?",
      duration: 30,
      answers: [
        { content: "4", isCorrect: true },
        { content: "5", isCorrect: false },
        { content: "3", isCorrect: false },
        { content: "6", isCorrect: false }
      ]
    },
    {
      question: "18 ÷ 3 = ?",
      duration: 30,
      answers: [
        { content: "6", isCorrect: true },
        { content: "5", isCorrect: false },
        { content: "7", isCorrect: false },
        { content: "4", isCorrect: false }
      ]
    },
    {
      question: "15 ÷ 5 = ?",
      duration: 30,
      answers: [
        { content: "3", isCorrect: true },
        { content: "4", isCorrect: false },
        { content: "2", isCorrect: false },
        { content: "5", isCorrect: false }
      ]
    },
    {
      question: "24 ÷ 6 = ?",
      duration: 30,
      answers: [
        { content: "4", isCorrect: true },
        { content: "5", isCorrect: false },
        { content: "3", isCorrect: false },
        { content: "6", isCorrect: false }
      ]
    },
    {
      question: "30 ÷ 10 = ?",
      duration: 30,
      answers: [
        { content: "3", isCorrect: true },
        { content: "2", isCorrect: false },
        { content: "4", isCorrect: false },
        { content: "5", isCorrect: false }
      ]
    },
    {
      question: "16 ÷ 4 = ?",
      duration: 30,
      answers: [
        { content: "4", isCorrect: true },
        { content: "3", isCorrect: false },
        { content: "5", isCorrect: false },
        { content: "6", isCorrect: false }
      ]
    },
    {
      question: "9 ÷ 3 = ?",
      duration: 30,
      answers: [
        { content: "3", isCorrect: true },
        { content: "2", isCorrect: false },
        { content: "4", isCorrect: false },
        { content: "1", isCorrect: false }
      ]
    },
    {
      question: "14 ÷ 2 = ?",
      duration: 30,
      answers: [
        { content: "7", isCorrect: true },
        { content: "6", isCorrect: false },
        { content: "8", isCorrect: false },
        { content: "5", isCorrect: false }
      ]
    },
    {
      question: "8 ÷ 2 = ?",
      duration: 30,
      answers: [
        { content: "4", isCorrect: true },
        { content: "3", isCorrect: false },
        { content: "5", isCorrect: false },
        { content: "2", isCorrect: false }
      ]
    }
  ]
};


  const questions = tasks[testId];

  // ============================
  //  СТАН КВІЗУ
  // ============================
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const totalQuestions = questions.length;
  const currentQuestionNumber = currentIndex + 1;
  const questionData = questions[currentIndex];

  // ============================
  //  ТАЙМЕР
  // ============================
  const [time, setTime] = useState(30);

  // Скидання тесту при поверненні на екран
  useFocusEffect(
    React.useCallback(() => {
      // Скидаємо все при вході на екран
      setCurrentIndex(0);
      setScore(0);
      setTime(30);
    }, [])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => {
        if (t === 0) {
          handleNextQuestion(0); // 0 балів, якщо не відповіла
          return 30;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // ============================
  //  ПЕРЕХІД ДО НАСТУПНОГО ПИТАННЯ
  // ============================
  const handleNextQuestion = (points: number = 1) => {
    const newScore = score + points;
    setScore(newScore);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setTime(30);
    } else {
      // Додаємо результат у глобальний стан
      addResult({
        nick: "Guest",
        score: newScore,
        total: totalQuestions,
        type: testNames[testId],
        date: new Date().toLocaleDateString(),
      });
      navigation.navigate('Results', { score: newScore, testId: testId });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>
          Question {currentQuestionNumber} of {totalQuestions}
        </Text>
        <Text style={styles.headerText}>Time: {time} sec</Text>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${(currentQuestionNumber / totalQuestions) * 100}%` },
          ]}
        />
      </View>

      <Text style={styles.questionText}>{questionData.question}</Text>

      <View style={styles.answersBox}>
        {questionData.answers.map((ans, i) => (
          <TouchableOpacity
            key={i}
            style={styles.answerButton}
            onPress={() => handleNextQuestion(ans.isCorrect ? 1 : 0)}
          >
            <Text style={styles.answerText}>{ans.content}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  headerText: { fontSize: 18, fontWeight: '600' },
  progressBar: { width: '100%', height: 12, backgroundColor: '#eee', borderRadius: 6, overflow: 'hidden', marginBottom: 30 },
  progressFill: { height: '100%', backgroundColor: '#444' },
  questionText: { fontSize: 20, textAlign: 'center', marginBottom: 25 },
  answersBox: { marginTop: 20 },
  answerButton: { paddingVertical: 15, marginBottom: 15, borderWidth: 1, borderColor: '#999', borderRadius: 8, alignItems: 'center' },
  answerText: { fontSize: 18 },
});