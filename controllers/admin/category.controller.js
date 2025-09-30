const Category = require("../../models/category.model");
const categoryHelper = require("../../helpers/category.helper");

module.exports.list = async (req, res) => {
  res.render("admin/pages/category-list", {
    pageTitle: "Quản lý danh mục",
  });
};

module.exports.create = async (req, res) => {
  const categoryList = await Category.find({
    deleted: false,
  });

  const categoryTree = categoryHelper.buildCategoryTree(categoryList, "");

  res.render("admin/pages/category-create", {
    pageTitle: "Tạo danh mục",
    categoryList: categoryTree,
  });
};

module.exports.createPost = async (req, res) => {
  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const totalRecord = await Category.countDocuments({});
    req.body.position = totalRecord + 1;
  }

  req.body.createBy = req.account.id;
  req.body.updateBy = req.account.id;
  req.body.avatar = req.file ? req.file.path : "";

  const newRecord = new Category(req.body);
  await newRecord.save();

  res.json({
    code: "success",
    message: "Tạo danh mục thành công!",
  });
};

// [
//   {
//     id: "1",
//     name: "Danh mục 1",
//     children: [
//       {
//         id: "1-1",
//         name: "Danh mục 1 - 1"
//       },
//       {
//         id: "1-2",
//         name: "Danh mục 1 - 2"
//       },
//       {
//         id: "1-3",
//         name: "Danh mục 1 - 3"
//       }
//     ]
//   },
//   {
//     id: "2",
//     name: "Danh mục 2",
//     children: [
//       {
//         id: "2-1",
//         name: "Danh mục 2 - 1"
//       },
//       {
//         id: "2-2",
//         name: "Danh mục 2 - 2"
//       }
//     ]
//   }
// ]
