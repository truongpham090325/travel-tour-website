const Category = require("../../models/category.model");
const categoryHelper = require("../../helpers/category.helper");
const City = require("../../models/city.model");
const Tour = require("../../models/tour.model");
const AccountAdmin = require("../../models/account-admin.model");
const moment = require("moment");
const slugify = require("slugify");

module.exports.list = async (req, res) => {
  const find = {
    deleted: false,
  };
  // Lọc theo trạng thái
  if (req.query.status) {
    find.status = req.query.status;
  }
  // Hết lọc theo trạng thái

  // Lọc theo Người tạo
  if (req.query.createdBy) {
    find.createdBy = req.query.createdBy;
  }
  // Hết Lọc theo Người tạo

  // Lọc theo ngày tạo
  const dataFilter = {};
  if (req.query.startDate) {
    const startDate = moment(req.query.startDate).toDate();
    dataFilter.$gte = startDate;
  }
  if (req.query.endDate) {
    const endDate = moment(req.query.endDate).toDate();
    dataFilter.$lte = endDate;
  }
  if (Object.keys(dataFilter).length > 0) {
    find.createdAt = dataFilter;
  }
  // Hết lọc theo ngày tạo

  // Tìm kiếm
  if (req.query.keyword) {
    const keyword = slugify(req.query.keyword);
    const keywordRegex = new RegExp(keyword, "i");
    find.slug = keywordRegex;
  }
  // Hết tìm kiếm

  // Phân trang
  const limitItems = 4;
  let page = 1;
  if (req.query.page && parseInt(req.query.page) > 0) {
    page = parseInt(req.query.page);
  }
  const skip = (page - 1) * limitItems;
  const totalRecord = await Tour.countDocuments(find);
  const totalPage = Math.ceil(totalRecord / limitItems);
  const pagination = {
    skip: skip,
    totalRecord: totalRecord,
    totalPage: totalPage,
  };
  // Hết phân trang
  const tourList = await Tour.find(find)
    .sort({
      position: "desc",
    })
    .limit(limitItems)
    .skip(skip);

  // Danh sách tài khoản quản trị
  const accountAdminList = await AccountAdmin.find({});
  // Hết danh sách tài khoản quản trị

  for (const item of tourList) {
    if (item.createdBy) {
      const infoAccount = await AccountAdmin.findOne({
        _id: item.createdBy,
      });
      if (infoAccount) {
        item.createdByFullName = infoAccount.fullName;
      }
    }

    if (item.updatedBy) {
      const infoAccount = await AccountAdmin.findOne({
        _id: item.updatedBy,
      });
      if (infoAccount) {
        item.updatedByFullName = infoAccount.fullName;
      }
    }

    item.createdAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YYYY");
    item.updatedAtFormat = moment(item.updatedAt).format("HH:mm - DD/MM/YYYY");
  }

  res.render("admin/pages/tour-list", {
    pageTitle: "Quản lý tour",
    tourList: tourList,
    accountAdminList: accountAdminList,
    pagination: pagination,
  });
};

module.exports.create = async (req, res) => {
  const categoryList = await Category.find({
    deleted: false,
  });

  const categoryTree = categoryHelper.buildCategoryTree(categoryList, "");

  const cityList = await City.find({});

  res.render("admin/pages/tour-create", {
    pageTitle: "Tạo tour",
    categoryList: categoryTree,
    cityList: cityList,
  });
};

module.exports.createPost = async (req, res) => {
  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const totalRecord = await Tour.countDocuments({});
    req.body.position = totalRecord + 1;
  }

  req.body.avatar = req.file ? req.file.path : "";
  req.body.priceAdult = req.body.priceAdult ? parseInt(req.body.priceAdult) : 0;
  req.body.priceChildren = req.body.priceChildren
    ? parseInt(req.body.priceChildren)
    : 0;
  req.body.priceBaby = req.body.priceBaby ? parseInt(req.body.priceBaby) : 0;
  req.body.priceNewAdult = req.body.priceNewAdult
    ? parseInt(req.body.priceNewAdult)
    : req.body.priceAdult;
  req.body.priceNewChildren = req.body.priceNewChildren
    ? parseInt(req.body.priceNewChildren)
    : req.body.priceChildren;
  req.body.priceNewBaby = req.body.priceNewBaby
    ? parseInt(req.body.priceNewBaby)
    : req.body.priceBaby;
  req.body.stockAdult = req.body.stockAdult ? parseInt(req.body.stockAdult) : 0;
  req.body.stockChildren = req.body.stockChildren
    ? parseInt(req.body.stockChildren)
    : 0;
  req.body.stockBaby = req.body.stockBaby ? parseInt(req.body.stockBaby) : 0;
  req.body.locations = req.body.locations ? JSON.parse(req.body.locations) : [];
  req.body.departureDate = req.body.departureDate
    ? new Date(req.body.departureDate)
    : null;
  req.body.schedules = req.body.schedules ? JSON.parse(req.body.schedules) : [];

  req.body.createdBy = req.account.id;
  req.body.updatedBy = req.account.id;

  const newRecord = new Tour(req.body);
  await newRecord.save();

  res.json({
    code: "success",
    message: "Tạo mới thành công!",
  });
};

module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    const tourDetail = await Tour.findOne({
      _id: id,
      deleted: false,
    });

    if (tourDetail.departureDate) {
      tourDetail.departureDateFormat = moment(tourDetail.departureDate).format(
        "YYYY-MM-DD"
      );
    }

    const categoryList = await Category.find({
      deleted: false,
    });

    const categoryTree = categoryHelper.buildCategoryTree(categoryList, "");

    const cityList = await City.find({});

    res.render("admin/pages/tour-edit", {
      pageTitle: "Chỉnh sửa tour",
      categoryList: categoryTree,
      tourDetail: tourDetail,
      cityList: cityList,
    });
  } catch {
    res.redirect(`/${pathAdmin}/tour/list`);
  }
};

module.exports.trash = async (req, res) => {
  res.render("admin/pages/tour-trash", {
    pageTitle: "Thùng rác tour",
  });
};
