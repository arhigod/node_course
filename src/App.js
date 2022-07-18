import express from 'express';
import users from './router/users';
import groups from './router/groups';
import usersGroups from './router/usersGroups';
import { infoLogger, errorLogger, exceptionLogger } from './middlewares/logger';

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));

app.use(express.json());

app.use(infoLogger);

app.use('/users', users);
app.use('/groups', groups);
app.use('/usersGroups', usersGroups);

app.use(errorLogger);

process.on('uncaughtException', err => {
  exceptionLogger('uncaughtException', err);
  process.exit(1);
});

process.on('unhandledRejection', err => {
  exceptionLogger('unhandledRejection', err);
  process.exit(1);
});

export default app;
