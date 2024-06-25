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
  image: Joi.string(),
  id: Joi.number().required(),
});

const validateEdit = (req, res, next) => {
  const { error } = editSchema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(400).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = validateEdit;
