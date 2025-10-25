const Order = require("../../models/order.model");
const Tour = require("../../models/tour.model");
const {
  paymentMethodList,
  paymentStatusList,
  statusList,
  pathAdmin,
} = require("../../config/variable.config");
const moment = require("moment");

module.exports.list = async (req, res) => {
  const find = {
    deleted: false,
  };

  // Lọc theo trạng thái
  if (req.query.status) {
    find.status = req.query.status;
  }
  // Hết lọc theo trạng thái

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
    find.fullName = req.query.keyword;
  }
  // Hết tìm kiếm

  // Phân trang
  const limitItems = 3;
  let page = 1;
  if (req.query.page && parseInt(req.query.page) > 0) {
    page = parseInt(req.query.page);
  }
  const skip = (page - 1) * limitItems;
  const totalRecord = await Order.countDocuments(find);
  const totalPage = Math.ceil(totalRecord / limitItems);
  const pagination = {
    skip: skip,
    totalRecord: totalRecord,
    totalPage: totalPage,
  };
  // Hết phân trang

  const orderList = await Order.find(find).sort({
    createdAt: "desc",
  });

  for (const orderDetail of orderList) {
    orderDetail.paymentMethodName = paymentMethodList.find(
      (item) => item.value == orderDetail.paymentMethod
    ).label;

    orderDetail.paymentStatusName = paymentStatusList.find(
      (item) => item.value == orderDetail.paymentStatus
    ).label;

    orderDetail.statusInfo = statusList.find(
      (item) => item.value == orderDetail.status
    );

    orderDetail.createdAtTime = moment(orderDetail.createdAt).format("HH:mm");
    orderDetail.createdAtDate = moment(orderDetail.createdAt).format(
      "DD/MM/YYYY"
    );

    for (const item of orderDetail.items) {
      const tourInfo = await Tour.findOne({
        _id: item.tourId,
      });
      if (tourInfo) {
        item.avatar = tourInfo.avatar;
        item.name = tourInfo.name;
      }
    }
  }

  res.render("admin/pages/order-list", {
    pageTitle: "Quản lý đơn hàng",
    orderList: orderList,
    pagination: pagination,
  });
};

module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const orderDetail = await Order.findOne({
      _id: id,
      deleted: false,
    });
    if (!orderDetail) {
      res.redirect(`/${pathAdmin}/order/list`);
      return;
    }
    orderDetail.createdAtFormat = moment(orderDetail.createdAt).format(
      "YYYY-MM-DDTHH:mm"
    );

    for (const item of orderDetail.items) {
      const itemInfo = await Tour.findOne({
        _id: item.tourId,
      });
      if (itemInfo) {
        item.avatar = itemInfo.avatar;
        item.name = itemInfo.name;
        item.departureDateFormat = moment(itemInfo.departureDate).format(
          "DD/MM/YYYY"
        );
      }
    }

    res.render("admin/pages/order-edit", {
      pageTitle: `Đơn hàng: ${orderDetail.code}`,
      orderDetail: orderDetail,
      paymentMethodList: paymentMethodList,
      paymentStatusList: paymentStatusList,
      statusList: statusList,
    });
  } catch (error) {
    res.redirect(`/${pathAdmin}/order/list`);
  }
};

module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;

    await Order.updateOne(
      {
        _id: id,
        deleted: false,
      },
      req.body
    );

    res.json({
      code: "success",
      message: "Cập nhập đơn hàng thành công!",
    });
  } catch (error) {
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!",
    });
  }
};

module.exports.destroyDelete = async (req, res) => {
  try {
    const id = req.params.id;

    await Order.deleteOne({
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
