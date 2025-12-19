import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

export default function TestScreen({ navigation, addResult }) {
  const drawerNavigation = useNavigation();
  const route = useRoute();

  // id тесту з HomeScreen
  const { id } = route.params;

  // ============================
  //  СТАНИ
  // ============================
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [type, setType] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);

  // ============================
  //  HEADER (drawer)
  // ============================
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => drawerNavigation.openDrawer()} style={{ marginLeft: 15 }}>
          <Text style={{ fontSize: 24, fontFamily: 'Roboto-Regular' }}>☰</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, drawerNavigation]);

  // ============================
  //  ЗАВАНТАЖЕННЯ ТЕСТУ З API
  // ============================
  useEffect(() => {
    fetch(`https://tgryl.pl/quiz/test/${id}`)
      .then(res => res.json())
      .then(data => {
        setTest(data);
        setQuestions(data.tasks);
        setType(data.name);
      })
      .catch(err => console.error("Błąd pobierania testu:", err));
  }, [id]);

  // ============================
  //  RESET ПРИ ПОВТОРНОМУ ВХОДІ
  // ============================
  useFocusEffect(
    React.useCallback(() => {
      setCurrentIndex(0);
      setScore(0);
      setTime(30);
    }, [])
  );

  // ============================
  //  ТАЙМЕР
  // ============================
  useEffect(() => {
    if (questions.length === 0) return;

    const interval = setInterval(() => {
      setTime((t) => {
        if (t === 0) {
          handleNextQuestion(0);
          return 30;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, questions]);

 if (!test) {
   return (
     <View style={styles.container}>
       <Text style={styles.questionText}>Ładowanie testu...</Text>
     </View>
   );
 }





  const totalQuestions = questions.length;
  const currentQuestionNumber = currentIndex + 1;
  const questionData = questions[currentIndex] || null;


  // ============================
  //  ВІДПРАВКА РЕЗУЛЬТАТУ (POST)
  // ============================
  const sendResult = async (finalScore) => {
    try {
      const response = await fetch("https://tgryl.pl/quiz/result/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nick: "tamarafyl",
          score: finalScore,
          total: totalQuestions,
          type: type, // ← правильний type з API
        }),
      });

      const text = await response.text();
      console.log("Odpowiedź serwera:", text);

    } catch (error) {
      console.error("Błąd wysyłania:", error);
    }
  };

  // ============================
  //  ПЕРЕХІД ДО НАСТУПНОГО ПИТАННЯ
  // ============================
  const handleNextQuestion = (points = 1) => {
    const newScore = score + points;
    setScore(newScore);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
      setTime(30);
    } else {
      sendResult(newScore);

      addResult({
        nick: "tamarafyl",
        score: newScore,
        total: totalQuestions,
        type: type,
        date: new Date().toLocaleDateString(),
      });

      navigation.navigate('Results');
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
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Roboto-Bold',
  },
  progressBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#eee',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 30,
  },
  progressFill: { height: '100%', backgroundColor: '#444' },
  questionText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 25,
    fontFamily: 'Roboto-Bold',
  },
  answersBox: { marginTop: 20 },
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
    fontFamily: 'SplineSansMono-Regular',
  },
});
