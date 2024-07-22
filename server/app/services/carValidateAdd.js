const Joi = require("joi");

const addSchema = Joi.object({
  brand: Joi.string()
    .pattern(/^[a-zA-ZÀ-ÿ\s']+$/)
    .min(2)
    .max(55)
    .required(),
  model: Joi.string()
    .pattern(/^[a-zA-Z0-9À-ÿ\s']+$/)
    .min(2)
    .max(55)
    .required(),
  socket: Joi.string().allow(),
  user_id: Joi.number().allow(),
});

const validateAdd = (req, res, next) => {
  const { error } = addSchema.validate(req.body, { abortEarly: true });

  if (error !== undefined) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};
module.exports = validateAdd;
