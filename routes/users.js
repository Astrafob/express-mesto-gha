const router = require('express').Router();
const {
  getUsers, getUserById, updateUsers, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserById);
router.get('/:userId', getUserById);
router.patch('/me', updateUsers);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
