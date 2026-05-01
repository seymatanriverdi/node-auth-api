
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";
const { register, login } = require("./controllers/authController");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const errorMiddleware = require("./middlewares/errorMiddleware");
const User = require("./models/User");
const AppError = require("./utils/AppError");
const validate = require("./middlewares/validate");
const authMiddleware = require("./middlewares/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const {
  registerSchema,
  loginSchema
} = require("./validations/authValidation");

const app = express();
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;


console.log("MONGO_URI var mı:", !!MONGO_URI);


// 1) MongoDB bağlantısı
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:");
    console.error(error);
    process.exit(1);
  }
}

//Login ve register route'ları
app.use("/", authRoutes);

//prpfile ve user route'ları
app.use("/", userRoutes);

// Ana route
app.get("/", (req, res) => {
  res.send("MongoDB auth API ayakta");
});


app.use(errorMiddleware);
// Başlat
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:3000`);
  });
});