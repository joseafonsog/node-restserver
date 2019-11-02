const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const app = express();

app.post("/login", (req, res) => {

  let body = req.body;

  User.findOne({ email: body.email }, (err, userDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!userDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Invalid Username or Password"
        }
      });
    }

    if (!bcrypt.compareSync(body.password,userDB.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Invalid Username or Password"
        }
      });

    }

    let token = jwt.sign({
      user: userDB
    },process.env.SEED, { expiresIn: 60 * 60 * 24 * 30 });

    res.json({
      ok: true,
      user: userDB,
      token
    });

  });
  
});

module.exports = app;