const express = require("express");
const router = express.Router();
const Expert = require("../../models/expert");

router.post("/expert-create", (req, res) => {
  Expert.create(req.body)
    .then((expert) => {
      console.log("saved");
      res.json({ msg: "Saved successfully", data: expert });
    })
    .catch((err) => {
      console.log(err, "err");
      res.status(400).json({ error: "Unable to save" });
    });
});

router.get("/expert", (req, res) => {
  Expert.find(req.body)
    .then((expert) => {
      res.json({ data: expert });
    })
    .catch((err) => {
      console.log(err, "err");
      res.status(400).json({ error: "Unable to save" });
    });
});
module.exports = router;
