const express = require("express");
const router = express.Router();
const Service = require("../../models/Service");

router.post("/service/:userId", async (req, res) => {
  const { userId } = req.params; // Extract userId from request parameters
  const service = req.body; // Extract service data from request body

  // Add userId to the service data object
  serviceData.userId = userId;
  // Create new service entry in the Service collection
  const createdService = await Service.create({ ...service, userId });

  // Send success response with created service data
  res
    .status(201)
    .json({ msg: "Service saved successfully", data: createdService });
});




router.get("/service/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    // Find all answer forms with the given user ID
    const services = await Service.find({ userId: userId });
    console.log(services, "answerForms");
    res
      .status(200)
      .json({ msg: "Answer forms retrieved successfully", data: services });
  } catch (error) {
    console.error("Error retrieving answer forms:", error);
    res.status(500).json({ error: "Unable to retrieve answer forms" });
  }
});

module.exports = router;
