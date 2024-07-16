const Joi = require("joi");

const addSchema = Joi.object({
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
  password2: Joi.string().valid(Joi.ref("password")).required(),
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
