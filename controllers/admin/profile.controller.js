const AccountAdmin = require("../../models/account-admin.model");
const bcrypt = require("bcryptjs");

module.exports.edit = async (req, res) => {
  res.render("admin/pages/profile-edit", {
    pageTitle: "Thông tin cá nhân",
    profileDetail: req.account,
  });
};

module.exports.editPatch = async (req, res) => {
  const existEmail = await AccountAdmin.findOne({
    _id: { $ne: req.account.id }, //ne : not equal
    email: req.body.email,
  });

  if (existEmail) {
    res.json({
      code: "error",
      message: "Email đã tồn tại trong hệ thống!",
    });
    return;
  }

  req.body.updatedBy = req.account.id;
  if (req.file) {
    req.body.avatar = req.file.path;
  } else {
    delete req.body.avatar;
  }

  await AccountAdmin.updateOne(
    {
      _id: req.account.id,
      deleted: false,
    },
    req.body
  );

  res.json({
    code: "success",
    message: "Cập nhập thông tin thành công!",
  });
};

module.exports.changePassword = async (req, res) => {
  res.render("admin/pages/profile-change-password", {
    pageTitle: "Đổi mật khẩu",
  });
};

module.exports.changePasswordPatch = async (req, res) => {
  //Mã hóa mật khẩu
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(req.body.password, salt);

  await AccountAdmin.updateOne(
    {
      _id: req.account.id,
      deleted: false,
    },
    req.body
  );

  res.json({
    code: "success",
    message: "Đổi mật khẩu thành công!",
  });
};
