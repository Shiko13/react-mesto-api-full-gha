const jwt = require('jsonwebtoken');

const AuthorizationError = require('../errors/AuthorizationError');

const { JWT_SECRET = 'JWT_SECRET', NODE_ENV = 'production' } = process.env;

module.exports.auth = (req, res, next) => {
  let token = req.headers.authorization || req.body.token || req.cookies.token;

  if (!token) {
    return next(new AuthorizationError('Неправильные почта или пароль-1'));
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }

  try {
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.headers.authorization = token;
    req.user = payload;

    return next();
  } catch (error) {
    return next(new AuthorizationError('Недействительный токен'));
  }
};
