const router = require('express').Router();
const {
  getUsers, getUser, getUserById, updateUsers, updateAvatar,
} = require('../controllers/users');
const { validateDataIdUser, validateNewDataUser, validateNewAvatarUser } = require('../middlewares/validationRequest');

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:userId', validateDataIdUser, getUserById);
router.patch('/me', validateNewDataUser, updateUsers);
router.patch('/me/avatar', validateNewAvatarUser, updateAvatar);

module.exports = router;
