

const express = require("express");
const app = express();

app.use(express.json());

let users = [
  { id: 1, name: "Seyma" },
  { id: 2, name: "Fatih" }
];

const products = [
  { id: 1, name: "Laptop", price: 35000 },
  { id: 2, name: "Mouse", price: 500 },
  { id: 3, name: "Keyboard", price: 1200 }
];

app.get("/", (req, res) => {
  res.send("API ayakta");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

app.post("/users", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name: name
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created",
    user: newUser
  });
});

app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { name } = req.body;

  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  user.name = name;

  res.json({
    message: "User updated",
    user: user
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  users = users.filter(u => u.id !== userId);

  res.json({
    message: "User deleted",
    users: users
  });
});

app.get("/products", (req, res) => {
  const minPrice = parseInt(req.query.minPrice);

  if (minPrice) {
    const filtered = products.filter(p => p.price >= minPrice);
    return res.json(filtered);
  }

  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

