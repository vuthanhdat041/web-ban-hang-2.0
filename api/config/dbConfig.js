const { Sequelize } = require("sequelize");
require("dotenv").config();

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT,
//     logging: process.env.DB_LOGGING === "true",
// });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: process.env.DB_LOGGING === "true",
    port: 1433, // Bổ sung nếu chưa có
    dialectOptions: {
      encrypt: true, // BẮT BUỘC với Azure SQL
      trustServerCertificate: false, // Nên giữ false để bảo mật
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Kết nối SQL Server thành công!");
  } catch (err) {
    console.error("❌ Lỗi kết nối:", err);
    process.exit(1); // Thoát ứng dụng nếu kết nối thất bại
  }
};

module.exports = { sequelize, connectDB };
