require("./config/config");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/user", (req, res) => {
  res.json("get user!");
});

app.post("/user", (req, res) => {
  let body = req.body;

  if (body.name === undefined) {
    res.status(400).json({
      ok: false,
      message: "Name is required!"
    });
  } else {
    res.json({
      user: body
    });
  }
});

app.put("/user/:id", (req, res) => {
  let id = req.params.id;
  res.json({
    id
  });
});

app.delete("/user", (req, res) => {
  res.json("delete user!");
});

app.listen(process.env.PORT, () => {
  console.log("listening on Port: ", process.env.PORT);
})