import Joi from 'joi';

const schema = Joi.array().items(Joi.string());

export default schema;
