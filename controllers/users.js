const User = require('../models/user');
const BadRequestError = require('../utils/error/400');
const NotFoundError = require('../utils/error/404');
const InternalServerError = require('../utils/error/500');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BadRequestError).send({ message: 'invalid data to get user' });
      } if (err.name === 'DocumentNotFoundError') {
        return res.status(NotFoundError).send({ message: `${userId} is not found` });
      }
      return res.status(InternalServerError).send({ message: err.message });
    });
};

const createUsers = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(BadRequestError).send({ message: 'invalid data to create user' });
      }
      return res.status(InternalServerError).send({ message: err.message });
    });
};

const updateUsers = (req, res) => {
  const { name, about } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(BadRequestError).send({ message: 'invalid data to update dataUser' });
      } if (err.name === 'DocumentNotFoundError') {
        return res.status(NotFoundError).send({ message: `${owner} is not found` });
      }
      return res.status(InternalServerError).send({ message: err.message });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(BadRequestError).send({ message: 'invalid data to update avatarUser' });
      } if (err.name === 'DocumentNotFoundError') {
        return res.status(NotFoundError).send({ message: `${owner} is not found` });
      }
      return res.status(InternalServerError).send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUsers,
  updateUsers,
  updateAvatar,
};
