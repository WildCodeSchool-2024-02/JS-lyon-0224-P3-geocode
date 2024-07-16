const Joi = require("joi");

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const validateSignIn = (req, res, next) => {
  const { error } = signInSchema.validate(req.body, { abortEarly: true });

  if (error !== null) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};
module.exports = validateSignIn;
