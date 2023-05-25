const router = require('express').Router();
const {
  getCards, createCards, deleteCards, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCards);
router.delete('/cards/:id', deleteCards);
router.put('/cards/:id/likes', likeCard);
router.delete('/cards/:id/likes', dislikeCard);

module.exports = router;
