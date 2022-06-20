import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().alter({ new: schema => schema.required() }),
  permissions: Joi.array()
    .items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
    .alter({ new: schema => schema.required() })
});

export default {
  new: schema.tailor('new'),
  update: schema.tailor('update')
};
