'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total: {
        type: Sequelize.DECIMAL(10, 2), // DECIMAL phù hợp cho giá tiền
        allowNull: false,
      },
      order_date: {
        type: Sequelize.DATE, // TIMESTAMP = DATE trong Sequelize
        allowNull: false,
        defaultValue: Sequelize.NOW, // Lấy thời gian hiện tại
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Chờ xác nhận",
      },
      address: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("orders");
  }
};
