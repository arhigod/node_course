import { Router } from 'express';
import joiValidator from 'express-joi-validation';
import groupUsersSchema from '../validation/groupUsers';
import UsersGroups from '../models/UsersGroups';
import GroupsUsersService from '../services/GroupsUsersService';
import { createTryCatch } from '../util';

const validator = joiValidator.createValidator({});
const groupsUsersService = new GroupsUsersService(UsersGroups);

const router = Router();

router.route('/').get(createTryCatch(async (_req, res) => res.json(await groupsUsersService.getGroupsUsers())));

router.route('/:id').post(
  validator.body(groupUsersSchema),
  createTryCatch(async ({ body, params: { id: groupId } }, res) =>
    res.json(await groupsUsersService.createGroupUsers(groupId, body))
  )
);

export default router;
