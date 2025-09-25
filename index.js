const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const clientRoutes = require("./routes/client/index.route");
require("dotenv").config();
const app = express();
const port = 3000;

//Kết nối với CSDL
mongoose.connect(process.env.DATABASE);

//Thiết lập thư mục chứa code giao diện
app.set("views", path.join(__dirname, "views"));

//Thiết lập template engine
app.set("view engine", "pug");

//Thiết lập thư mục chứa file tĩnh
app.use(express.static(path.join(__dirname, "public")));

app.use("/", clientRoutes);

app.listen(port, () => {
  console.log(`Website đang chạy trên cổng ${port}`);
});
