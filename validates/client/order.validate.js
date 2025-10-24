const Joi = require("joi");

module.exports.orderCreatePost = async (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().required().messages({
      "string.empty": "Vui lòng nhập họ tên!",
    }),
    phone: Joi.string().required().messages({
      "string.empty": "Vui lòng nhập số điện thoại!",
    }),
    note: Joi.string().allow(""),
    paymentMethod: Joi.string().allow(""),
    items: Joi.string().required().messages({
      "string.empty": "Vui lòng chọn ít nhất một tour!",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;

    res.json({
      code: "error",
      message: errorMessage,
    });
    return;
  }

  next();
};
