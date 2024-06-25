const express = require('express');
const states = require('./constants');
const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Successfully Access My API',
  });
});

app.get('/states', (req, res) => {
  res.status(200).json(states);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;
