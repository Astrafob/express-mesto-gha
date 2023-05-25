const router = require('express').Router();
const {
  getUsers, getUserById, createUsers, updateUsers, updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.post('/users', createUsers);
router.patch('/users/me', updateUsers);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
