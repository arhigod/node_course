import express from 'express';
import users from './router/users';

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));

app.use(express.json());

app.use('/users', users);

app.use('/', (err, _req, res, next) => {
  res.status(404).json(err);
  next();
});

export default app;
