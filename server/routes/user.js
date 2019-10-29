const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const app = express();

app.get("/users", (req, res) => {
  res.json("get user!");
});

app.post("/users", (req, res) => {
  let body = req.body;

  let user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  user.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      user: userDB
    });
  });
});

app.put("/users/:id", (req, res) => {
  let id = req.params.id;
  res.json({
    id
  });
});

app.delete("/users", (req, res) => {
  res.json("delete user!");
});

module.exports = app;