/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Messenger App listening on port http://localhost:${PORT}/`);
});
