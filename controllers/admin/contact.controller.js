const Contact = require("../../models/contact.model");
const moment = require("moment");
const slugify = require("slugify");

module.exports.list = async (req, res) => {
  const find = {
    deleted: false,
  };

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
    find.email = keywordRegex;
  }
  // Hết tìm kiếm

  // Phân trang
  const limitItems = 4;
  let page = 1;
  if (req.query.page && parseInt(req.query.page) > 0) {
    page = parseInt(req.query.page);
  }
  const skip = (page - 1) * limitItems;
  const totalRecord = await Contact.countDocuments(find);
  const totalPage = Math.ceil(totalRecord / limitItems);
  const pagination = {
    skip: skip,
    totalRecord: totalRecord,
    totalPage: totalPage,
  };
  // Hết phân trang

  const contactList = await Contact.find(find)
    .sort({
      createdAt: "desc",
    })
    .limit(limitItems)
    .skip(skip);

  for (const item of contactList) {
    item.createdAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YYYY");
  }

  contactList.createdAtFormat = res.render("admin/pages/contact-list", {
    pageTitle: "Thông tin liên hệ",
    contactList: contactList,
    pagination: pagination,
  });
};

module.exports.changeMultiPatch = async (req, res) => {
  try {
    const { option, ids } = req.body;
    switch (option) {
      case "destroy":
        await Contact.deleteMany({
          _id: { $in: ids },
        });
        res.json({
          code: "success",
          message: "Đã xóa vĩnh viễn!",
        });
        break;
      default:
        res.json({
          code: "error",
          message: "Hành động không hợp lệ!",
        });
        break;
    }
  } catch (error) {
    res.json({
      code: "error",
      message: "Bản ghi không hợp lệ!",
    });
  }
};

module.exports.destroyDelete = async (req, res) => {
  try {
    const id = req.params.id;

    await Contact.deleteOne({
      _id: id,
    });

    res.json({
      code: "success",
      message: "Đã xóa vĩnh viễn!",
    });
  } catch (error) {
    res.json({
      code: "error",
      message: "Bản ghi không hợp lệ!",
    });
  }
};
