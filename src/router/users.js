import { Router } from 'express';
import joiValidator from 'express-joi-validation';
import userSchema from '../validation/user';
import Users from '../models/Users';
import UsersService from '../services/UsersService';
import { createTryCatch } from '../util';

const validator = joiValidator.createValidator({});
const usersService = new UsersService(Users);

const router = Router();

router
  .route('/')
  .get(createTryCatch(async ({ query }, res) => res.json(await usersService.getUsers(query))))
  .post(
    validator.body(userSchema.new),
    createTryCatch(async ({ body }, res) => res.json(await usersService.createUser(body)))
  );

router
  .route('/:id')
  .get(createTryCatch(async ({ params: { id } }, res) => res.json(await usersService.getUser(id))))
  .patch(
    validator.body(userSchema.update),
    createTryCatch(async ({ body, params: { id } }, res) => res.json(await usersService.updateUser(id, body)))
  )
  .delete(
    createTryCatch(async ({ params: { id } }, res) => {
      await usersService.deleteUser(id);
      res.status(204).json();
    })
  );

export default router;
