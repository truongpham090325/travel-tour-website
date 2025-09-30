const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dwfupuebl",
  api_key: "991327967523154",
  api_secret: "RjoavfClqIZJt5QRNAEes35bqMM",
});

module.exports.storage = new CloudinaryStorage({
  cloudinary: cloudinary,
});
