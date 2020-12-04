import Joi = require('joi')

const priceSchema = Joi.number().min(0.01);

export const createPointSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  whatsapp: Joi.number().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  city: Joi.string().required(),
  uf: Joi.string().required().max(2),
  items: Joi.string().required(),
});

export const editPointSchema = Joi.object().keys({
  description: Joi.string(),
  price: priceSchema.error(() => 'when editing price must be number greater than 0.01')
});
