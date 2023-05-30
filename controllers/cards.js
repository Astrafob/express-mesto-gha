const Card = require('../models/card');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../utils/errors');

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
        return next(new BadRequestError('invalid data to create card'));
      }
      return next(err);
    });
};

const deleteCards = (req, res, next) => {
  const { cardId } = req.params;
  const owner = req.user._id;

  Card.findById(cardId)
    .orFail()
    .then((card) => {
      if (!card) {
        throw new NotFoundError('card is not found');
      }
      if (card.owner.toString() !== owner) {
        throw new ForbiddenError('not enough rights');
      }
      return card.deleteOne()
        .then((cardData) => {
          res.send({ data: cardData });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('invalid data to delete card'));
      } if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError(`${cardId} is not found`));
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
        throw new NotFoundError('card is not found');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError('invalid data to add likeCard'));
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
        throw new NotFoundError('card is not found');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError('invalid data to add likeCard'));
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
