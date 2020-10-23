const express = require("express");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.post("/posts", verifyToken, (req, res) => {
  res.json({ message: "Post created.." });
});

app.post("/login", (req, res) => {
  // Mock user
  const user = {
    id: 1,
    username: "shahzad",
    email: "shazee257@gmail.com",
  };

  jwt.sign({ user }, "secretkey", (err, token) => {
    res.json({ token: token, length: token.length });
  });
});

// Verify Token
function verifyToken(req, res, next) {
  //
  next();
}

app.listen(5000, () => console.log("Server is running on port 5000"));
