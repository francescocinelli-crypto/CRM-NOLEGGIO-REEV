
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const fs = require('fs');
const { Parser } = require('json2csv');

app.use(bodyParser.json());
app.use(express.static('public'));

let clienti = [];

// Aggiungi cliente
app.post('/api/clienti', (req, res) => {
  clienti.push(req.body);
  res.json({ status: 'ok', clienti });
});

// Scarica in Excel (CSV)
app.get('/api/export', (req, res) => {
  const parser = new Parser();
  const csv = parser.parse(clienti);
  res.header('Content-Type', 'text/csv');
  res.attachment('clienti.csv');
  return res.send(csv);
});

app.listen(port, () => {
  console.log(`CRM avviato su porta ${port}`);
});
