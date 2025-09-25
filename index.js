const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

//Thiết lập thư mục chứa code giao diện
app.set("views", path.join(__dirname, "views"));

//Thiết lập template engine
app.set("view engine", "pug");

//Thiết lập thư mục chứa file tĩnh
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("client/pages/home", {
    pageTitle: "Trang chủ",
  });
});

app.get("/tours", (req, res) => {
  res.render("client/pages/tour-list", {
    pageTitle: "Danh sách tour",
  });
});

app.listen(port, () => {
  console.log(`Website đang chạy trên cổng ${port}`);
});
