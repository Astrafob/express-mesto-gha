const { celebrate, Joi } = require('celebrate');

// eslint-disable-next-line no-useless-escape
const urlPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
const idPattern = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

const validateDataForCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlPattern),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const validateDataforAuthorize = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const validateDataIdUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().regex(idPattern),
  }),
});

const validateNewDataUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateNewAvatarUser = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(urlPattern),
  }),
});

const validateDataCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(urlPattern),
  }),
});

const validateDataIdCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().regex(idPattern),
  }),
});

module.exports = {
  validateDataForCreateUser,
  validateDataforAuthorize,
  validateDataIdUser,
  validateNewDataUser,
  validateNewAvatarUser,
  validateDataCreateCard,
  validateDataIdCard,
};
