const express = require("express");
const packageController = require("../controllers/packageController");

const router = express.Router();

router
  .route("/packages")
  .get(packageController.getAllPackages)
  .post(packageController.createPackage);

router
  .route("/packages/:id")
  .get(packageController.getPackageById)
  .put(packageController.updatePackage)
  .delete(packageController.deletePackage);

module.exports = router;
