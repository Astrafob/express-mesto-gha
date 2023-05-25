const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '646baf3c3609fd6769cde65b',
  };

  next();
});
app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
