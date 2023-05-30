const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const handleErrors = require('./middlewares/handleErrors');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use('/', router);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
