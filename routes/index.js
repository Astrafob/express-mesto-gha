const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { NotFoundError } = require('../utils/errors');
const { createUsers, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', createUsers);
router.post('/signin', login);

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);

router.use('/*', (req, res, next) => {
  next(new NotFoundError('page is not found'));
});

module.exports = router;
