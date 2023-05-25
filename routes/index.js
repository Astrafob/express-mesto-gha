const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { NotFoundError } = require('../utils/errors');

router.use(userRouter);
router.use(cardRouter);
router.use('/*', (req, res) => {
  res.status(NotFoundError).send({ message: 'page is not found' });
});

module.exports = router;
