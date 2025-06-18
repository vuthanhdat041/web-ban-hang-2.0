const cors = require("cors");
require("dotenv").config();

const corsOptions = {
  origin: process.env.REACT_APP_CLIENT_URL, // Cập nhật domain của React app
  methods: ["GET", "POST", "PUT", "DELETE"], // Các phương thức được phép
  allowedHeaders: ["Content-Type", "Authorization"], // Header được phép
  credentials: true, // Cho phép gửi cookie qua CORS
};

module.exports = cors(corsOptions);
