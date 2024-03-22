const express = require("express");
const router = express.Router();
const Form = require("../../models/createForm");

router.post("/create", (req, res) => {
  Form.create(req.body)
    .then((Formdata) => {
      console.log("saved");
      res.json({ msg: "Saved successfully", data: Formdata });
    })
    .catch((err) => {
      console.log(err, "err");
      res.status(400).json({ error: "Unable to save" });
    });
});

router.get("/forms", (req, res) => {
  Form.find()
    .then((form) => res.json({ form }))
    .catch((err) => res.status(404).json({ message: "No data found" }));
});



module.exports = router;
