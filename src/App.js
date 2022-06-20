import express from 'express';
import users from './router/users';
import groups from './router/groups';
import usersGroups from './router/usersGroups';

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));

app.use(express.json());

app.use('/users', users);
app.use('/groups', groups);
app.use('/usersGroups', usersGroups);

app.use('/', (err, _req, res, next) => {
  res.status(404).json(err);
  next();
});

export default app;
