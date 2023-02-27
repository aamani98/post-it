const Joi = require("joi");

const updateUserInputValidation = (req, res, next) => {
  const schema = Joi.string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .message(
      '"Password" must have one capital alphabet[A-Z], one digit[0-9], one special character[#?!@$%^&*-] and should be alteast 8 characters long.'
    )
    .label("Password");

  if (req.body.password) {
    const { error } = schema.validate(req.body.password);
    if (error) {
      res.status(400).send(error.details.map((err) => err.message));
      return;
    }
  }
  next();
};

module.exports = updateUserInputValidation;
