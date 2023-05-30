const router = require('express').Router();
const {
  getCards, createCards, deleteCards, likeCard, dislikeCard,
} = require('../controllers/cards');
const { validateDataCreateCard, validateDataIdCard } = require('../middlewares/validationRequest');

router.get('/', getCards);
router.post('/', validateDataCreateCard, createCards);
router.delete('/:cardId', validateDataIdCard, deleteCards);
router.put('/:cardId/likes', validateDataIdCard, likeCard);
router.delete('/:cardId/likes', validateDataIdCard, dislikeCard);

module.exports = router;
