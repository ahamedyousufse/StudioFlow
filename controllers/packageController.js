const packageModel = require(`../models/packageModel`);

const packageController = {
  getAllPackages: (req, res) => {
    packageModel.findAll((err, rows) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json({ data: rows });
      }
    });
  },
  getPackageById: (req, res) => {
    const id = req.params.id;
    // get pacakage by id
    packageModel.findById(id, (err, row) => {
      if (err) {
        console.error("error fetching package: ", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (!row) {
        return res.status(404).json({ error: "package not found" });
      }
      res.status(200).json({ package: row });
    });
  },

  createPackage: (req, res) => {
    const packageData = [
      req.body.name,
      req.body.price,
      req.body.duration,
      req.body.description,
    ];

    // query to insert new packages to the database
    if (!packageData[0]) {
      return res.status(400).json({ error: "name con not be empty!" });
    } else if (packageData[1] <= 0) {
      return res.status(400).json({ error: "enter a valid price!" });
    } else if (!packageData[2]) {
      return res.status(400).json({ error: "duration con not be empty!" });
    }

    packageModel.create(packageData, (err) => {
      if (err) {
        console.error("error creating package: ", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(201).json({ message: "package created successfully" });
      }
    });
  },

  updatePackage: (req, res) => {
    const packageData = [
      req.body.name,
      req.body.price,
      req.body.duration,
      req.body.description,
      req.params.id,
    ];

    packageModel.update(packageData, function (err) {
      if (err) {
        console.error("error updating package: ", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
      } else if (this.changes === 0) {
        res.status(404).json({error: "pacakge id not found"});
      }
      else {
        res.status(200).json({ message: "Updated package successfully!" });
      }
    });
  },

  deletePackage: (req, res) => {
    const packageId = req.params.id; // id of the package that is going to be deleted

    packageModel.delete(packageId, (err) => {
      if (err) {
        console.error("error deleting the package: ", err.message);
        return res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({ message: "deleted package successfully" });
      }
    });
  },
};

module.exports = packageController;
