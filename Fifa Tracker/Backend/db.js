import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Pfad zur DB-Datei auflösen
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'data', 'fifa.db');

// DB initialisieren und exportieren
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Fehler beim Öffnen der Datenbank:', err.message);
  } else {
    console.log('✅ SQLite-Datenbank erfolgreich geöffnet:', dbPath);
  }
});

// Tabellen erstellen
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      team TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS matches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      player1_id INTEGER,
      player2_id INTEGER,
      result TEXT,
      date TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(player1_id) REFERENCES users(id),
      FOREIGN KEY(player2_id) REFERENCES users(id)
    )
  `);
});

export default db;
