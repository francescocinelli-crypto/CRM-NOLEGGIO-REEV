const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware per leggere JSON
app.use(express.json());

// Cartella per upload
const uploadFolder = path.join(__dirname, 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Lista clienti in memoria (esempio)
let clienti = [];

// API per aggiungere cliente
app.post('/api/clienti', (req, res) => {
  const { nome, telefono, email, stato, note } = req.body;
  const id = Date.now();
  clienti.push({ id, nome, telefono, email, stato, note });
  res.json({ success: true, id });
});

// API per caricare documento
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send('Nessun file');
  res.json({ success: true, filename: req.file.filename });
});

// API per vedere clienti
app.get('/api/clienti', (req, res) => {
  res.json(clienti);
});

// Frontend semplice
app.use(express.static(path.join(__dirname, '../frontend')));

// Root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => console.log(`Server in ascolto su ${PORT}`));
