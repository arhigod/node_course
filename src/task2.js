import express from 'express';
import users from '../data/Users.json';
import { randomUUID } from 'crypto';

const app = express();
app.listen(3000);
app.use(express.json());
const router = express.Router();
app.use('/user', router);

router.param('id', (req, _res, next, id) => {
  req.user = users.find(x => x.id === id);
  if (req.user) {
    next();
  } else {
    next({ error: `User with id '${id}' not found` });
  }
});

router.get('/', (req, res) => {
  const { loginSubstring = '', limit = users.length } = req.query;
  const usersFiltered = users
    .filter(x => !x.isDeleted && x.login.startsWith(loginSubstring))
    .sort((a, b) => a.login.localeCompare(b.login))
    .slice(0, limit);

  res.json(usersFiltered);
});

router.post('/', ({ body: { login, password, age } }, res) => {
  const user = { id: randomUUID(), login, password, age, isDeleted: false };

  users.push(user);
  res.json(user);
});

router.get('/:id', ({ user }, res) => res.json(user));

router.put('/:id', ({ user, body: { login, password, age } }, res) => {
  user.login = login ?? user.login;
  user.password = password ?? user.password;
  user.age = age ?? user.age;

  res.json(user);
});

router.delete('/:id', ({ user }, res) => {
  user.isDeleted = true;
  res.status(204).json();
});

app.use('/', (err, _req, res, next) => {
  res.status(404).json(err);
  next(err);
});
