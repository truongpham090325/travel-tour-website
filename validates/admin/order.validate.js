const Joi = require("joi");

module.exports.orderEditPatch = async (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().required().messages({
      "string.empty": "Vui lòng nhập họ tên khách hàng!",
    }),
    phone: Joi.string().required().messages({
      "string.empty": "Vui lòng nhập số điện thoại!",
    }),
    note: Joi.string().allow(""),
    paymentMethod: Joi.string().allow(""),
    paymentStatus: Joi.string().allow(""),
    status: Joi.string().allow(""),
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
