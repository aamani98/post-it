const Joi = require("joi");

const registerInputValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string()
      .required()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .message(
        '"Password" must have one capital alphabet[A-Z], one digit[0-9], one special character[#?!@$%^&*-] and should be alteast 8 characters long.'
      )
      .label("Password"),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).send(error.details.map((err) => err.message));
    return;
  }
  next();
};

const loginInputValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).send(error.details.map((err) => err.message));
    return;
  }
  next();
};

module.exports = { registerInputValidation, loginInputValidation };
