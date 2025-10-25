const AccountAdmin = require("../../models/account-admin.model");
const Order = require("../../models/order.model");

module.exports.dashboard = async (req, res) => {
  // Thông số tổng quan
  const overview = {
    totalAdmin: 0,
    totalOrder: 0,
    totalRevenue: 0,
  };

  overview.totalAdmin = await AccountAdmin.countDocuments({
    deleted: false,
  });

  const orderList = await Order.find({
    deleted: false,
  });

  overview.totalOrder = orderList.length;
  overview.totalRevenue = orderList.reduce(
    (total, item) => total + item.total,
    0
  );
  // Hết thông số tổng quan

  res.render("admin/pages/dashboard", {
    pageTitle: "Tổng quan",
    overview: overview,
  });
};
