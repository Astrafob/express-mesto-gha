const Card = require('../models/card');
const { BadRequestError, NotFoundError } = require('../utils/errors');

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

const createCards = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(BadRequestError).send({ message: 'invalid data to create card' });
      }
      return next(err);
    });
};

const deleteCards = (req, res, next) => {
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
      return next(err);
    });
};

const likeCard = (req, res, next) => {
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
      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
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
      return next(err);
    });
};

module.exports = {
  getCards,
  createCards,
  deleteCards,
  likeCard,
  dislikeCard,
};
