const { permissionList } = require("../../config/variable.config");
const AccountAdmin = require("../../models/account-admin.model");
const Role = require("../../models/role.model");
const SettingWebsiteInfo = require("../../models/setting-website-info.model");
const slugify = require("slugify");
const bcrypt = require("bcryptjs");
const moment = require("moment");

module.exports.list = async (req, res) => {
  res.render("admin/pages/setting-list", {
    pageTitle: "Cài đặt chung",
  });
};

module.exports.websiteInfo = async (req, res) => {
  const settingWebsiteInfo = await SettingWebsiteInfo.findOne({});

  res.render("admin/pages/setting-website-info", {
    pageTitle: "Thông tin website",
    settingWebsiteInfo: settingWebsiteInfo,
  });
};

module.exports.websiteInfoPatch = async (req, res) => {
  if (req.files && req.files.logo) {
    req.body.logo = req.files.logo[0].path;
  }

  if (req.files && req.files.favicon) {
    req.body.favicon = req.files.favicon[0].path;
  }

  const settingWebsiteInfo = await SettingWebsiteInfo.findOne({});
  if (!settingWebsiteInfo) {
    const newRecord = new SettingWebsiteInfo(req.body);
    await newRecord.save();
  } else {
    await SettingWebsiteInfo.updateOne(
      {
        _id: settingWebsiteInfo.id,
      },
      req.body
    );
  }

  res.json({
    code: "success",
    message: "Cập nhập thành công!",
  });
};

module.exports.accountAdminList = async (req, res) => {
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

  // Lọc theo nhóm quyền
  if (req.query.role) {
    find.role = req.query.role;
  }
  // Hết lọc theo nhóm quyền

  const roleList = await Role.find({
    deleted: false,
  });

  const accountAdminList = await AccountAdmin.find(find).sort({
    createdAt: "desc",
  });

  for (const item of accountAdminList) {
    if (item.role) {
      const roleInfo = await Role.findOne({
        _id: item.role,
      });
      if (roleInfo) {
        item.roleName = roleInfo.name;
      }
    }
  }

  res.render("admin/pages/setting-account-admin-list", {
    pageTitle: "Tài khoản quản trị",
    accountAdminList: accountAdminList,
    roleList: roleList,
  });
};

module.exports.accountAdminCreate = async (req, res) => {
  const roleList = await Role.find({
    deleted: false,
  });

  res.render("admin/pages/setting-account-admin-create", {
    pageTitle: "Tạo tài khoản quản trị",
    roleList: roleList,
  });
};

module.exports.accountAdminCreatePost = async (req, res) => {
  try {
    const existAccount = await AccountAdmin.findOne({
      email: req.body.email,
    });

    if (existAccount) {
      res.json({
        code: "error",
        message: "Email đã tồn tại trong hệ thống!",
      });
      return;
    }

    req.body.createdBy = req.account.id;
    req.body.updatedBy = req.account.id;
    req.body.avatar = req.file ? req.file.path : "";

    //Mã hóa mật khẩu
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);

    const newAccount = new AccountAdmin(req.body);
    await newAccount.save();

    res.json({
      code: "success",
      message: "Tạo tài khoản thành công!",
    });
  } catch (error) {
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!",
    });
  }
};

module.exports.roleList = async (req, res) => {
  const find = {
    deleted: false,
  };

  // Tìm kiếm
  if (req.query.keyword) {
    const keyword = slugify(req.query.keyword);
    const keywordRegex = new RegExp(keyword, "i");
    find.slug = keywordRegex;
  }
  // Hết tìm kiếm

  const roleList = await Role.find(find).sort({
    createdAt: "desc",
  });

  res.render("admin/pages/setting-role-list", {
    pageTitle: "Nhóm quyền",
    roleList: roleList,
  });
};

module.exports.roleCreate = async (req, res) => {
  res.render("admin/pages/setting-role-create", {
    pageTitle: "Tạo nhóm quyền",
    permissionList: permissionList,
  });
};

module.exports.roleCreatePost = async (req, res) => {
  try {
    req.body.permissions = JSON.parse(req.body.permissions);
    req.body.createdBy = req.account.id;
    req.body.updatedBy = req.account.id;

    const newRecord = new Role(req.body);
    await newRecord.save();

    res.json({
      code: "success",
      message: "Tạo nhóm quyền thành công!",
    });
  } catch (error) {
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!",
    });
  }
};

module.exports.roleEdit = async (req, res) => {
  try {
    const id = req.params.id;

    const roleDetail = await Role.findOne({
      _id: id,
      deleted: false,
    });

    if (!roleDetail) {
      res.redirect(`/${pathAdmin}/setting/role/list`);
      return;
    }

    res.render("admin/pages/setting-role-edit", {
      pageTitle: "Chỉnh sửa nhóm quyền",
      permissionList: permissionList,
      roleDetail: roleDetail,
    });
  } catch (error) {
    res.redirect(`/${pathAdmin}/setting/role/list`);
  }
};

module.exports.roleEditPatch = async (req, res) => {
  try {
    const id = req.params.id;

    const roleDetail = await Role.findOne({
      _id: id,
      deleted: false,
    });

    if (!roleDetail) {
      res.json({
        code: "error",
        message: "Bản ghi không tồn tại!",
      });
      return;
    }
    req.body.permissions = JSON.parse(req.body.permissions);
    req.body.updatedBy = req.account.id;

    await Role.updateOne(
      {
        _id: id,
        deleted: false,
      },
      req.body
    );

    res.json({
      code: "success",
      message: "Cập nhật nhóm quyền thành công!",
    });
  } catch (error) {
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!",
    });
  }
};

module.exports.roleDeletePatch = async (req, res) => {
  try {
    const id = req.params.id;

    await Role.deleteOne({
      _id: id,
    });

    res.json({
      code: "success",
      message: "Đã xóa nhóm quyền!",
    });
  } catch (error) {
    res.json({
      code: "error",
      message: "Bản ghi không hợp lệ!",
    });
  }
};

module.exports.changeMultiPatch = async (req, res) => {
  try {
    const { option, ids } = req.body;
    switch (option) {
      case "delete":
        await Role.deleteMany({
          _id: { $in: ids },
        });
        res.json({
          code: "success",
          message: "Đã xóa nhóm quyền!",
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
