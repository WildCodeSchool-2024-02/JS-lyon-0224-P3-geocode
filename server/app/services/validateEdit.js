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
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  city: Joi.string()
    .pattern(/^[a-zA-ZÀ-ÿ\s']+$/)
    .min(3)
    .max(55)
    .required(),
  image: Joi.string().allow(""),
});

const validateEdit = (req, res, next) => {
  const { error } = editSchema.validate(req.body, { abortEarly: false });

  if (error !== undefined) {
    res.status(400).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = validateEdit;
