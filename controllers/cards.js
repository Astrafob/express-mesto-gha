const Card = require('../models/card');
const { BadRequestError, NotFoundError, InternalServerError } = require('../utils/errors');

const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => res.status(InternalServerError).send({ message: err.message }));
};

const createCards = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(BadRequestError).send({ message: 'invalid data to create card' });
      }
      return res.status(InternalServerError).send({ message: err.message });
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
        return res.status(BadRequestError).send({ message: 'invalid data to delete card' });
      } if (err.name === 'DocumentNotFoundError') {
        return res.status(NotFoundError).send({ message: `${cardId} is not found` });
      }
      return res.status(InternalServerError).send({ message: err.message });
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
      if (!card) {
        return res.status(NotFoundError).send({ message: `${cardId} is not found` });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(BadRequestError).send({ message: 'invalid data to add likeCard' });
      }
      return res.status(InternalServerError).send({ message: err.message });
    });
};

const dislikeCard = (req, res) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: owner } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NotFoundError).send({ message: `${cardId} is not found` });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(BadRequestError).send({ message: 'invalid data to delete likeCard ' });
      }
      return res.status(InternalServerError).send({ message: err.message });
    });
};

module.exports = {
  getCards,
  createCards,
  deleteCards,
  likeCard,
  dislikeCard,
};
