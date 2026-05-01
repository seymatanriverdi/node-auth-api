
const express = require("express");
const app = express();

app.use(express.json());


const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET_KEY = "mysecretkey";
let users = [];
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // validation
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  // password hash
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword
  };

  users.push(newUser);

  res.status(201).json({
    message: "User registered",
    user: { id: newUser.id, username: newUser.username }
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // password check
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Wrong password" });
  }

  // token üret
  const token = jwt.sign(
    { id: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login successful",
    token: token
  });
});


function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Token gerekli" });
  }
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Bearer token formatı yanlış" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Geçersiz token" });
  }
}

app.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Bu protected route",
    user: req.user
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});