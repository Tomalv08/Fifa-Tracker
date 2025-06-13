import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
  const { username, team } = req.body;
  const db = req.app.locals.db;

  console.log('📥 Neue User-Anfrage erhalten:', { username, team });

  const sql = 'INSERT INTO users (username, team) VALUES (?, ?)';
  db.run(sql, [username, team], function (err) {
    if (err) {
      console.error('❌ Fehler beim Speichern des Users:', err.message);
      return res.status(500).json({ error: err.message });
    }

    console.log('✅ User gespeichert mit ID:', this.lastID);
    res.status(201).json({ id: this.lastID, username, team });
  });
});

router.get('/', (req, res) => {
  const db = req.app.locals.db;

  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error('❌ Fehler beim Abrufen der User:', err.message);
      return res.status(500).json({ error: err.message });
    }

    console.log('📤 Alle User abgerufen:', rows);
    res.json(rows);
  });
});

export default router;
