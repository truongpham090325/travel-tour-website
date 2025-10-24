const Tour = require("../../models/tour.model");
const moment = require("moment");

module.exports.cart = async (req, res) => {
  res.render("client/pages/cart", {
    pageTitle: "Giỏ hàng",
  });
};

module.exports.detail = async (req, res) => {
  try {
    const cart = req.body;
    const cartDetail = [];

    for (const item of cart) {
      const tourInfo = await Tour.findOne({
        _id: item.tourId,
        status: "active",
        deleted: false,
      });

      if (tourInfo) {
        cartDetail.push({
          tourId: item.tourId,
          locationFrom: item.locationFrom,
          quantityAdult: item.quantityAdult,
          quantityChildren: item.quantityChildren,
          quantityBaby: item.quantityBaby,
          avatar: tourInfo.avatar,
          name: tourInfo.name,
          departureDate: moment(tourInfo.departureDate).format("DD/MM/YYYY"),
          stockAdult: tourInfo.stockAdult,
          stockChildren: tourInfo.stockChildren,
          stockBaby: tourInfo.stockBaby,
          priceNewAdult: tourInfo.priceNewAdult,
          priceNewChildren: tourInfo.priceNewChildren,
          priceNewBaby: tourInfo.priceNewBaby,
          slug: tourInfo.slug,
        });
      }
    }

    res.json({
      code: "success",
      message: "Thành công!",
      cart: cartDetail,
    });
  } catch (error) {
    res.json({
      code: "error",
      message: "Thất bại!",
    });
  }
};
