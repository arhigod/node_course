import express from 'express';
import user from './router/User';

const app = express();
app.listen(3000);
app.use(express.json());

app.use('/user', user);

app.use('/', (err, _req, res, next) => {
  res.status(400).json(err);
  next(err);
});

export default app;
