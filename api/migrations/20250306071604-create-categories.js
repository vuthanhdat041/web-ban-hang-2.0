'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("categories", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true, // Đảm bảo không có danh mục trùng lặp
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true, // Mô tả có thể để trống
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("categories");
  }
};
