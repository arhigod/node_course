import express from 'express';
import cors from 'cors';
import users from './router/users';
import groups from './router/groups';
import usersGroups from './router/usersGroups';
import authorization from './router/authorization';
import { infoLogger, errorLogger, exceptionLogger } from './middlewares/logger';
import authorizationMiddleware from './middlewares/authorization';

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));

app.use(cors());

app.use(express.json());

app.use(infoLogger);

app.use('/authorization', authorization);
app.use('/users', [authorizationMiddleware, users]);
app.use('/groups', [authorizationMiddleware, groups]);
app.use('/usersGroups', [authorizationMiddleware, usersGroups]);

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
