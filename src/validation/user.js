import Joi from 'joi';
import users from '../data/users.json';

const loginValidation = (login, options) => {
  const { id } = options.state.ancestors[0];
  if (users.some(user => user.id !== id && user.login === login)) {
    throw new Error(`login '${login}' already exists`);
  }
  return login;
};

const schema = Joi.object({
  id: Joi.any().alter({
    new: schema => schema.forbidden()
  }),
  login: Joi.string()
    .custom(loginValidation)
    .alter({
      new: schema => schema.required()
    }),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*\d).*$/i)
    .alter({
      new: schema => schema.required()
    }),
  age: Joi.number()
    .integer()
    .min(4)
    .max(130)
    .alter({
      new: schema => schema.required()
    })
});

export default {
  new: schema.tailor('new'),
  update: schema.tailor('update')
};
