'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("permissions", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true, // Đảm bảo quyền không bị trùng
      },
      description: {
        type: Sequelize.TEXT, // Mô tả chi tiết quyền
        allowNull: true, // Có thể để trống
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("permissions");
  }
};
