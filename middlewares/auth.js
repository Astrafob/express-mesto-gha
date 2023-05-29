const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/errors');

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     return next(new UnauthorizedError('authorization required'));
//   }

//   const token = req.cookies.jwt;
//   let payload;

//   try {
//     payload = jwt.verify(token, 'af04bb295e7cd2425af9c549e31f0ed48417863bf167aced7684d7cd55879a28');
//   } catch (err) {
//     return next(new UnauthorizedError('authorization required'));
//   }

//   req.user = payload;
//   return next();
// };

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'super-puper-secret-key');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
