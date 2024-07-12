const Joi = require("joi");

const editSchema = Joi.object({
  brand: Joi.string()
    .pattern(/^[a-zA-ZÀ-ÿ\s']+$/)
    .min(2)
    .max(55)
    .required(),
  model: Joi.string()
    .pattern(/^[a-zA-ZÀ-ÿ\s']+$/)
    .min(2)
    .max(55)
    .required(),
  
  id: Joi.number().required(),
});

const carValidateEdit = (req, res, next) => {
  const { error } = editSchema.validate(req.body, { abortEarly: false });

  if (error === true) {
    res.status(400).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = carValidateEdit;
