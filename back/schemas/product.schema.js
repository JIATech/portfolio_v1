/* eslint-disable prettier/prettier */
const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().optional(),
  category: Joi.string().valid("Electronics", "Clothing", "Home").required(),
  quantity: Joi.number().integer().min(0).required(),
});



module.exports = productSchema;

