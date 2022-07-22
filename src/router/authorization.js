import { Router } from 'express';
import Users from '../models/Users';
import UsersService from '../services/UsersService';
import { createTryCatch } from '../util';

const usersService = new UsersService(Users);

const router = Router();

router.route('/').post(
  createTryCatch(async ({ body: { login, password } }, res) => {
    const token = await usersService.authorizeUser(login, password);
    res.json(token);
  })
);

export default router;
