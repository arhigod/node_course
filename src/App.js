import express from 'express';
import user from './router/User';

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));

app.use(express.json());

app.use('/user', user);

app.use('/', (err, _req, res, next) => {
  res.status(400).json(err);
  next(err);
});

export default app;
