import Joi from 'joi';

const schema = Joi.object({
  login: Joi.string().alter({ new: schema => schema.required() }),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*\d).*$/i)
    .alter({ new: schema => schema.required() }),
  age: Joi.number()
    .integer()
    .min(4)
    .max(130)
    .alter({ new: schema => schema.required() })
});

export default {
  new: schema.tailor('new'),
  update: schema.tailor('update')
};
