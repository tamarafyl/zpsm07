// src/database/testsLocal.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const TESTS_KEY = 'local_tests';

export const initTestsLocal = async () => {
  // nic nie trzeba tworzyć, ale zostawiamy dla spójności z API
  console.log('✅ AsyncStorage: initTestsLocal gotowe');
};

export const saveTestsLocal = async (tests: any[]) => {
  try {
    await AsyncStorage.setItem(TESTS_KEY, JSON.stringify(tests || []));
    console.log('💾 Zapisano testy w AsyncStorage:', tests?.length || 0);
  } catch (err) {
    console.error('❌ Błąd zapisu testów w AsyncStorage:', err);
  }
};

export const loadTestsLocal = async () => {
  try {
    const json = await AsyncStorage.getItem(TESTS_KEY);
    if (!json) {
      console.log('📥 Brak testów w AsyncStorage');
      return [];
    }
    const data = JSON.parse(json);
    console.log('📥 Wczytano testy z AsyncStorage:', Array.isArray(data) ? data.length : 0);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('❌ Błąd odczytu testów z AsyncStorage:', err);
    return [];
  }
};
