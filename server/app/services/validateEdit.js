const Joi = require("joi");

const editSchema = Joi.object({
  firstname: Joi.string()
    .pattern(/^[a-zA-ZÀ-ÿ\s']+$/)
    .min(3)
    .max(55)
    .required(),
  lastname: Joi.string()
    .pattern(/^[a-zA-ZÀ-ÿ\s']+$/)
    .min(3)
    .max(55)
    .required(),
  email: Joi.string().email().required(),
  city: Joi.string()
    .pattern(/^[a-zA-ZÀ-ÿ\s']+$/)
    .min(3)
    .max(55)
    .required(),
  password: Joi.string().min(8).required(),
});
const validateEdit = (req, res, next) => {
  const { error } = editSchema.validate(req.body, { abortEarly: true });

  if (!error === true) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};

module.exports = validateEdit;
