const Joi = require("joi");

const createPostInputValidation = (req, res, next) => {
  const { image, caption } = req.body;

  if (
    (image != null && image.length > 0) ||
    (caption != null && caption.length > 0)
  ) {
    next();
  } else {
    res.status(400).send({ message: "Image or Caption is Require" });
    return;
  }
};

module.exports = { createPostInputValidation };
