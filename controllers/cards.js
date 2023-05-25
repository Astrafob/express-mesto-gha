const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createCards = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({ message: 'invalid data to create card' });
      }
      return res.status(500).send({ message: err.message });
    });
};

const deleteCards = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'invalid data to delete card' });
      } if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: `${cardId} is not found` });
      }
      return res.status(500).send({ message: err.message });
    });
};

const likeCard = (req, res) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: owner } },
    { new: true },
  )
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({ message: 'invalid data to add likeCard' });
      } if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: `${cardId} is not found` });
      }
      return res.status(500).send({ message: err.message });
    });
};

const dislikeCard = (req, res) => {
  const owner = req.user._id;
  const { cardId } = req.params.cardId;

  Card.findByIdAndDelete(
    cardId,
    { $pull: { likes: owner } },
    { new: true },
  )
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({ message: 'invalid data to delete likeCard ' });
      } if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: `${cardId} is not found` });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = {
  getCards,
  createCards,
  deleteCards,
  likeCard,
  dislikeCard,
};
