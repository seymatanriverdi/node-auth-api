const express = require("express");
const app = express();

app.use(express.json());

let users = [
  { id: 1, name: "Seyma" },
  { id: 2, name: "Fatih" }
];


function getUsersFromFakeDb() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users);
    }, 1000);
  });
}

function getUserByIdFromFakeDb(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = users.find(u => u.id === id);
      resolve(user);
    }, 1000);
  });
}

app.get("/", (req, res) => {
  res.send("Fake DB API ayakta");
});

app.get("/users", async (req, res) => {
  try {
    const allUsers = await getUsersFromFakeDb();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await getUserByIdFromFakeDb(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});



app.use(express.json());

app.get("/", (req, res) => {
  res.send("API ayakta");
});
