const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: String,
    parent: String,
    position: Number,
    status: String,
    avarta: String,
    description: String,
    createBy: String,
    updateBy: String,
    slug: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deleteBy: String,
    deleteAt: String,
  },
  {
    timestamps: true, // Tự động sinh ra trường createAt và updateAt
  }
);

const Category = mongoose.model("Category", schema, "categories");

module.exports = Category;
