const jwt = require('jsonwebtoken');

const { NODE_ENV = 'production', JWT_SECRET = 'dev-secret' } = process.env;
const AuthorizationError = require('../errors/AuthorizationError');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log('authorization:', req.headers);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationError('Неправильные почта или пароль'));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    console.log('payload', payload);
  } catch (err) {
    return next(new AuthorizationError('Неправильные почта или пароль'));
  }

  req.user = payload;
  next();
};
