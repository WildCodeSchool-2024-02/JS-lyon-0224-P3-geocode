const Joi = require("joi");

const editSchema = Joi.object({
  brand: Joi.string()
    .pattern(/^[a-zA-ZÀ-ÿ\s']+$/)
    .min(1)
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

const carValidateEdit = (req, res, next) => {
  const { error } = editSchema.validate(req.body, { abortEarly: false });

  if (error !== undefined) {
    res.status(400).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = carValidateEdit;
