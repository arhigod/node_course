import jwt from 'jsonwebtoken';

export default ({ headers: { token } }, _res, next) => {
  if (token) {
    jwt.verify(token, 'shhhhh', { maxAge: '1d' }, err => {
      if (err) {
        next({ status: 403, message: 'Forbidden Error' });
      } else {
        next();
      }
    });
  } else {
    next({ status: 401, message: 'Unauthorized Error' });
  }
};
