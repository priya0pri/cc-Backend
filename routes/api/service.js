const express = require("express");
const router = express.Router();
const Service = require("../../models/Service");

router.post("/service/:formId", async (req, res) => {
  // Service.insertMany(req.body)
  //   .then((Formdata) => {
  //     console.log("saved");
  //     res.json({ msg: "Saved successfully", data: Formdata });
  //   })
  //   .catch((err) => {
  //     console.log(err, "err");
  //     res.status(400).json({ error: "Unable to save" });
  //   });
  const { formId } = req.params; // Extract userId from request parameters
  const serviceData = req.body; // Extract service data from request body

  // Add userId to the service data object
  serviceData.formId = formId;

  // Create new service entry in the Service collection
  const createdService = await Service.insertMany(serviceData);

  // Send success response with created service data
  res
    .status(201)
    .json({ msg: "Service saved successfully", data: createdService });
});

router.get("/service/:formId", async (req, res) => {
  try {
    const { formId } = req.params;
    console.log(formId, "userId");
    // Find all answer forms with the given user ID
    const answerForms = await Service.find({ formId: formId });
console.log(answerForms,"answerForms")
    res
      .status(200)
      .json({ msg: "Answer forms retrieved successfully", data: answerForms });
  } catch (error) {
    console.error("Error retrieving answer forms:", error);
    res.status(500).json({ error: "Unable to retrieve answer forms" });
  }
});
module.exports = router;
