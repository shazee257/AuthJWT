const express = require("express");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the JSON Web Token Tutorial API" });
});

app.post("/posts", verifyToken, (req, res) => {
  res.json({ message: "Post created!" });
  console.log(req);
});

app.post("/login", (req, res) => {
  // Mock user
  const user = {
    id: 1,
    username: "shahzad",
    email: "shazee257@gmail.com",
  };
  // Create JWT token
  jwt.sign({ user }, "secretkey", (err, token) => {
    res.json({ token: token });
  });
});

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    //req.token = bearerToken;
    // Next middleware
    jwt.verify(bearerToken, "secretkey", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        console.log(authData);
      }
    });
    next();
  } else {
    // forbidden
    res.sendStatus(403);
  }
}

app.listen(5000, () => console.log("Server is running on port 5000"));
