import express from 'express';
import joiValidator from 'express-joi-validation';
import { randomUUID } from 'crypto';
import users from '../data/users.json';
import userSchema from '../validation/user';

const validator = joiValidator.createValidator({});

const router = express.Router();

router.param('id', (req, _res, next, id) => {
  req.user = users.find(user => user.id === id);
  if (req.user) {
    next();
  } else {
    next({ error: `User with id '${id}' not found` });
  }
});

router
  .route('/')
  .get((req, res) => {
    const { loginSubstring = '', limit = users.length } = req.query;
    const usersFiltered = users
      .filter(x => !x.isDeleted && x.login.startsWith(loginSubstring))
      .sort((a, b) => a.login.localeCompare(b.login))
      .slice(0, limit);

    res.json(usersFiltered);
  })
  .post(validator.body(userSchema.new), ({ body }, res) => {
    const user = { id: randomUUID(), ...body, isDeleted: false };

    users.push(user);
    res.json(user);
  });

router
  .route('/:id')
  .get(({ user }, res) => res.json(user))
  .patch(
    ({ user, body }, _res, next) => {
      body.id = user.id;
      next();
    },
    validator.body(userSchema.update),
    ({ user, body: { login, password, age } }, res) => {
      user.login = login ?? user.login;
      user.password = password ?? user.password;
      user.age = age ?? user.age;

      res.json(user);
    }
  )
  .delete(({ user }, res) => {
    user.isDeleted = true;
    res.status(204).json();
  });

export default router;
