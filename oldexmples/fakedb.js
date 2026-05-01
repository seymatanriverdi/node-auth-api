const express = require("express");
const fs = require("fs").promises;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API ayakta");
});

app.get("/file-users", async (req, res) => {
  try {
    const data = await fs.readFile("users.json", "utf-8");
    const users = JSON.parse(data);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "File could not be read" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});