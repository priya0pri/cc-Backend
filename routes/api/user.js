const express = require("express");
const router = express.Router();
const User = require("../../models/user");

router.post("/user", (req, res) => {
  User.create(req.body)
    .then((user) => {
      console.log("saved");
      res.json({ msg: "Saved successfully", data: user });
    })
    .catch((err) => {
      console.log(err, "err");
      res.status(400).json({ error: "Unable to save" });
    });
});

router.get("/user", (req, res) => {
  User.find()
    .then((user) => res.json({ data: user }))
    .catch((err) => res.status(404).json({ message: "No data found" }));
});
module.exports = router;
