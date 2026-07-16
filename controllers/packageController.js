const packageModel = require(`../models/packageModel`);

const packageController = {
  getAllPackages: (req, res) => {
    packageModel.findAll((err, rows) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.status(200).json({ data: rows });
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
    const { name, price, duration, description } = req.body;
    const packageData = [name, price, duration, description];

    // validating user input
    validateInput(packageData, res);

    packageModel.create(packageData, (err) => {
      if (err) {
        console.error("error creating package: ", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.status(201).json({ message: "package created successfully" });
    });
  },

  updatePackage: (req, res) => {
    const id = req.params.id;
    const { name, price, duration, description } = req.body;
    const packageData = [name, price, duration, description, id];

    // validating user input
    validateInput(packageData, res);

    packageModel.update(packageData, function (err) {
      if (err) {
        console.error("error updating package: ", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
      } else if (this.changes === 0) {
        res.status(404).json({ error: "pacakge id not found" });
      } else {
        res.status(200).json({ message: "Updated package successfully!" });
      }
    });
  },

  deletePackage: (req, res) => {
    const packageId = req.params.id; // id of the package that is going to be deleted

    packageModel.delete(packageId, function (err) {
      if (err) {
        console.error("error deleting the package: ", err.message);
        return res.status(500).json({ error: err.message });
      } else if (this.changes === 0) {
        res.status(404).json({ error: "package not found" });
      } else {
        res.status(200).json({ message: "deleted package successfully" });
      }
    });
  }
};

function validateInput(data, res){
  if (!data[0]) {
      return res.status(400).json({ error: "name con not be empty!" });
    } else if (isNaN(data[1])) {
      return res.status(400).json({ error: "enter price in numbers" });
    } else if (data[1] <= 0) {
      return res.status(400).json({ error: "enter a valid price!" });
    } else if (!data[2]) {
      return res.status(400).json({ error: "duration con not be empty!" });
    }
}

module.exports = packageController;
