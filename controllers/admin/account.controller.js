const AccountAdmin = require("../../models/account-admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.login = async (req, res) => {
  res.render("admin/pages/login", {
    pageTitle: "Đăng nhập",
  });
};

module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;

  const existAccount = await AccountAdmin.findOne({
    email: email,
  });

  if (!existAccount) {
    res.json({
      code: "error",
      message: "Email không tồn tại trong hệ thống!",
    });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, existAccount.password);

  if (!isPasswordValid) {
    res.json({
      code: "error",
      message: "Mật khẩu không đúng!",
    });
    return;
  }

  if (existAccount.status != "active") {
    res.json({
      code: "error",
      message: "Tài khoản chưa được kích hoạt!",
    });
    return;
  }

  const token = jwt.sign(
    {
      id: existAccount.id,
      email: existAccount.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000, // 1 ngày
    httpOnly: true,
    sameSite: "strict",
  });

  res.json({
    code: "success",
    message: "Đăng nhập thành công!",
  });
};

module.exports.register = async (req, res) => {
  res.render("admin/pages/register", {
    pageTitle: "Đăng ký",
  });
};

module.exports.registerPost = async (req, res) => {
  const existAccount = await AccountAdmin.findOne({
    email: req.body.email,
  });

  if (existAccount) {
    res.json({
      code: "error",
      message: "Email đã tồn tại trong hệ thống!",
    });
    return;
  }

  req.body.status = "initial";

  //Mã hóa mật khẩu
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(req.body.password, salt);

  const newAccount = new AccountAdmin(req.body);
  await newAccount.save();

  res.json({
    code: "success",
    message: "Đăng ký tài khoản thành công!",
  });
};

module.exports.registerInitial = async (req, res) => {
  res.render("admin/pages/register-initial", {
    pageTitle: "Tài khoản đã được khởi tạo",
  });
};

module.exports.logoutPost = async (req, res) => {
  res.clearCookie("token");

  res.json({
    code: "success",
    message: "Đã đăng xuất",
  });
};

module.exports.forgotPassword = async (req, res) => {
  res.render("admin/pages/forgot-password", {
    pageTitle: "Quên mật khẩu",
  });
};

module.exports.otpPassword = async (req, res) => {
  res.render("admin/pages/otp-password", {
    pageTitle: "Nhập mã OTP",
  });
};

module.exports.resetPassword = async (req, res) => {
  res.render("admin/pages/reset-password", {
    pageTitle: " Đổi mật khẩu",
  });
};
