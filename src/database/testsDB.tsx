// src/database/testsDB.ts
import SQLite from 'react-native-sqlite-2';

// -------------------------
//  OPEN DATABASE (bez Fabric problemów)
// -------------------------
const getDB = () => {
  // nazwa, wersja, opis, rozmiar (nieistotny na Androidzie)
  return SQLite.openDatabase('tests.db', '1.0', 'Tests DB', 200000);
};

// Helper: obudowa executeSql w Promise
const executeSql = (
  db: any,
  sql: string,
  params: any[] = []
): Promise<{ rows: any }> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx: any) => {
        tx.executeSql(
          sql,
          params,
          (_tx: any, result: any) => resolve(result),
          (_tx: any, error: any) => {
            console.error('❌ SQL ERROR:', error, 'QUERY:', sql, 'PARAMS:', params);
            reject(error);
            return false;
          }
        );
      },
      (err: any) => {
        console.error('❌ TRANSACTION ERROR:', err);
        reject(err);
      }
    );
  });
};

// -------------------------
//  INIT TABLE
// -------------------------
export const initTestsDB = async () => {
  const db = getDB();

  await executeSql(
    db,
    `
    CREATE TABLE IF NOT EXISTS tests (
      id TEXT PRIMARY KEY,
      name TEXT,
      tags TEXT,
      updatedAt INTEGER
    );
  `
  );

  console.log('✅ SQLite: tabela tests gotowa');
  return db;
};

// -------------------------
//  SAVE TESTS SAFELY
// -------------------------
export const saveTestsToDB = async (tests: any[]) => {
  const db = getDB();
  const now = Date.now();

  console.log('💾 Saving to DB:', tests?.length);

  await new Promise<void>((resolve, reject) => {
    db.transaction(
      (tx: any) => {
        for (const t of tests) {
          const id = t?.id ? String(t.id) : String(Math.random());
          const name = t?.name ? String(t.name) : 'Bez nazwy';
          const tags = Array.isArray(t?.tags) ? t.tags : [];

          tx.executeSql(
            `REPLACE INTO tests (id, name, tags, updatedAt) VALUES (?, ?, ?, ?)`,
            [id, name, JSON.stringify(tags), now],
            () => {},
            (_tx: any, err: any) => {
              console.error('❌ DB INSERT ERROR:', err, 'TEST:', t);
              return false;
            }
          );
        }
      },
      (err: any) => {
        console.error('❌ TRANSACTION ERROR (saveTestsToDB):', err);
        reject(err);
      },
      () => {
        console.log('✅ Zapis testów zakończony');
        resolve();
      }
    );
  });
};

// -------------------------
//  LOAD TESTS
// -------------------------
export const loadTestsFromDB = async () => {
  const db = getDB();
  const result: any = await executeSql(db, `SELECT * FROM tests`);

  const rows = result.rows;
  console.log('📥 Loaded from DB:', rows.length);

  const list: any[] = [];

  for (let i = 0; i < rows.length; i++) {
    const item = rows.item(i);

    let parsedTags: any[] = [];
    try {
      parsedTags = JSON.parse(item.tags);
      if (!Array.isArray(parsedTags)) parsedTags = [];
    } catch {
      parsedTags = [];
    }

    list.push({
      id: item.id,
      name: item.name,
      tags: parsedTags,
    });
  }

  return list;
};
