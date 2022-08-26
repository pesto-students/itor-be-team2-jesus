const Joi = require("joi");

const userValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),
    photo: Joi.photo().required(),
    schoolName: Joi.string()

});

module.exports = userValidationSchema;