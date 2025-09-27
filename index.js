const express = require("express");
const path = require("path");
const databaseConfig = require("./config/database.config");
const clientRoutes = require("./routes/client/index.route");
const adminRoutes = require("./routes/admin/index.route");
const variableConfig = require("./config/variable.config");
require("dotenv").config();
const app = express();
const port = 3000;

//Kết nối với CSDL
databaseConfig.connect();

//Thiết lập thư mục chứa code giao diện
app.set("views", path.join(__dirname, "views"));

//Thiết lập template engine
app.set("view engine", "pug");

//Thiết lập thư mục chứa file tĩnh
app.use(express.static(path.join(__dirname, "public")));

//Tạo biến toàn cục trong file Pug
app.locals.pathAdmin = variableConfig.pathAdmin;

//Cho phép gửi dữ liệu lên dạng json
app.use(express.json());

app.use("/", clientRoutes);

app.use(`/${variableConfig.pathAdmin}`, adminRoutes);

app.listen(port, () => {
  console.log(`Website đang chạy trên cổng ${port}`);
});
