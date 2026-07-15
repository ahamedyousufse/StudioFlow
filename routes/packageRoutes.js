const packageController = require('../controllers/packageController');
const express = require('express');
const router = express.Router();

router.get("/packages", packageController.getAllPackages);
router.get("/packages/:id", packageController.getPackageById);
router.post("/packages", packageController.createPackage);
router.put("/packages/:id", packageController.updatePackage);
router.delete("/packages/:id", packageController.deletePackage); 

module.exports = router;