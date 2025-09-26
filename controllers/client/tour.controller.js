module.exports.list = async (req, res) => {
  res.render("client/pages/tour-list", {
    pageTitle: "Danh sách tour",
  });
};

module.exports.detail = async (req, res) => {
  res.render("client/pages/tour-detail", {
    pageTitle: "Chi tiết tour",
  });
};
