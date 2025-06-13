import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import db from './db.js';
import userRoutes from './routes/users.js';
import matchRoutes from './routes/matches.js';

const app = express();
app.use(cors());
app.use(express.json());

app.locals.db = db;

// API-Routen
app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);

// __dirname in ES Modules wiederherstellen
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👉 Absoluter Pfad zum Public-Ordner
const publicPath = path.resolve(__dirname, '../Frontend/Public');

// 🧩 Frontend bereitstellen
app.use(express.static(publicPath));

// Root: index.html zurückgeben
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server läuft auf http://localhost:${PORT}`));
