const Joi = require("joi");

module.exports = {
  body: {
    title: Joi.string().required(),
    descritption: Joi.string().required(),
    price: Joi.number().required()
  }
};
