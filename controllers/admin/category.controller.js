const Category = require("../../models/category.model");

module.exports.list = async (req, res) => {
  res.render("admin/pages/category-list", {
    pageTitle: "Quản lý danh mục",
  });
};

module.exports.create = async (req, res) => {
  res.render("admin/pages/category-create", {
    pageTitle: "Tạo danh mục",
  });
};

module.exports.createPost = async (req, res) => {
  // console.log(req.file);

  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const totalRecord = await Category.countDocument({});
    req.body.position = totalRecord + 1;
  }

  req.body.createBy = req.account.id;
  req.body.updateBy = req.account.id;

  const newRecord = new Category(req.body);
  await newRecord.save();

  res.json({
    code: "success",
    message: "Tạo danh mục thành công!",
  });
};
