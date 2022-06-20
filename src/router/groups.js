import { Router } from 'express';
import joiValidator from 'express-joi-validation';
import groupSchema from '../validation/group';
import Groups from '../models/Groups';
import GroupsService from '../services/GroupsService';
import { createTryCatch } from '../util';

const validator = joiValidator.createValidator({});
const groupsService = new GroupsService(Groups);

const router = Router();

router
  .route('/')
  .get(createTryCatch(async ({ query }, res) => res.json(await groupsService.getGroups(query))))
  .post(
    validator.body(groupSchema.new),
    createTryCatch(async ({ body }, res) => res.json(await groupsService.createGroup(body)))
  );

router
  .route('/:id')
  .get(createTryCatch(async ({ params: { id } }, res) => res.json(await groupsService.getGroup(id))))
  .patch(
    validator.body(groupSchema.update),
    createTryCatch(async ({ body, params: { id } }, res) => res.json(await groupsService.updateGroup(id, body)))
  )
  .delete(
    createTryCatch(async ({ params: { id } }, res) => {
      await groupsService.deleteGroup(id);
      res.status(204).json();
    })
  );

router.use('/', (err, _req, res, next) => {
  res.status(400).json(err.message ?? 'Internal Server Error');
  next();
});

export default router;
