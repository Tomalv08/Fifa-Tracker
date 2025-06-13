import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
  const { player1_id, player2_id, result } = req.body;
  const db = req.app.locals.db;

  console.log('📥 Neues Match erhalten:', { player1_id, player2_id, result });

  const sql = 'INSERT INTO matches (player1_id, player2_id, result) VALUES (?, ?, ?)';
  db.run(sql, [player1_id, player2_id, result], function (err) {
    if (err) {
      console.error('❌ Fehler beim Speichern des Matches:', err.message);
      return res.status(500).json({ error: err.message });
    }

    console.log('✅ Match gespeichert mit ID:', this.lastID);
    res.status(201).json({ id: this.lastID });
  });
});

router.get('/', (req, res) => {
  const db = req.app.locals.db;

  const sql = `
    SELECT m.id, u1.username AS player1, u2.username AS player2, m.result, m.date
    FROM matches m
    JOIN users u1 ON m.player1_id = u1.id
    JOIN users u2 ON m.player2_id = u2.id
    ORDER BY m.date DESC
  `;
  db.all(sql, (err, rows) => {
    if (err) {
      console.error('❌ Fehler beim Abrufen der Matches:', err.message);
      return res.status(500).json({ error: err.message });
    }

    console.log('📤 Alle Matches abgerufen:', rows);
    res.json(rows);
  });
});

export default router;
    