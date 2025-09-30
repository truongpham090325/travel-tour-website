const buildCategoryTree = (categories, parentId = "") => {
  // Tạo một mảng để lưu các danh mục con
  const tree = [];

  // Lặp qua từng danh mục trong mảng
  categories.forEach((item) => {
    // Nếu parent của danh mục hiện tại khớp với parentId
    if (item.parent === parentId) {
      // Đệ quy tìm các danh mục con của danh mục hiện tại
      const children = buildCategoryTree(categories, item.id);

      // Thêm danh mục hiện tại vào cây cùng với danh mục con
      tree.push({
        id: item.id,
        name: item.name,
        children: children, // Gắn mảng children (có thể rỗng)
      });
    }
  });

  // Trả về cây danh mục
  return tree;
};

// Xuất hàm qua module.exports
module.exports.buildCategoryTree = buildCategoryTree;
