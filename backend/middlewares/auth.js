const jwt = require('jsonwebtoken');

const { NODE_ENV = 'production', JWT_SECRET = 'dev-secret' } = process.env;
const AuthorizationError = require('../errors/AuthorizationError');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationError('Неправильные почта или пароль-1'));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new AuthorizationError('Неправильные почта или пароль-2'));
  }

  req.user = payload;
  next();
};
