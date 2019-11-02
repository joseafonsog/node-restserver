const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");
const User = require("../models/user");
const { verifyToken, verifyAdmin_Role } = require('../middlewares/authentication');

const app = express();

app.get("/users", verifyToken, (req, res) => {

  let from = req.query.from || 0;
  from = Number(from);

  let limit = req.query.limit || 5;
  limit = Number(limit);

  User.find({state: true}, "name email role state google img")
  .skip(from)
  .limit(limit)
  .exec((err, users) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    User.count({state: true}, (err, count) => {
      res.json({
        ok: true,
        users,
        total: count
      });
    });


  });
});

app.post("/users", [verifyToken, verifyAdmin_Role], (req, res) => {
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

app.put("/users/:id", [verifyToken, verifyAdmin_Role], (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["name", "email", "img", "role", "state"] );

  User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
    
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

app.delete("/users/:id", [verifyToken, verifyAdmin_Role], (req, res) => {
  let id = req.params.id;

  User.findByIdAndUpdate(id, { state: false }, { new: true }, (err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    if (!userDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "User not found!"
        }
      });
    }

    res.json({
      ok: true,
      user: userDB
    });
  });

  // User.findByIdAndRemove(id, (err, userDeleted) => {
  //   if (err) {
  //     return res.status(400).json({
  //       ok: false,
  //       err
  //     });
  //   }

  //   if (!userDeleted) {
  //     return res.status(400).json({
  //       ok: false,
  //       err: {
  //         message: "User not found!"
  //       }
  //     });
  //   }

  //   res.json({
  //     ok: true,
  //     user: userDeleted
  //   });
  // });
});

module.exports = app;