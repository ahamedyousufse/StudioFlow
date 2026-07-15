const packageModel = require(`../models/packageModel`);

const packageController = {
  getAllPackages: (req, res) => {
    packageModel.findAll((err, rows) => {
      if (err) {
        return console.error("something went wrong: ", err.message);
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
        return res.status(400).json({ error: "package not found" });
      }
      res.status(200).json({ package: row });
    });
  },

  createPackage: (req, res) => {
    // query to insert new packages to the database
    if (!req.body.name) {
      return res.status(400).json({ error: "name con not be empty!" });
    } else if (req.body.price <= 0) {
      return res.status(400).json({ error: "enter a valid price!" });
    } else if (!req.body.duration) {
      return res.status(400).json({ error: "duration con not be empty!" });
    }

    packageModel.create(
      req.body.name,
      req.body.price,
      req.body.duration,
      req.body.description,
      (err) => {
        if (err) {
          console.error("error creating package: ", err.message);
          return res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.status(200).json({ message: "package created successfully" });
        }
      },
    );
  },

  updatePackage: (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const price = req.body.price;
    const duration = req.body.duration;
    const description = req.body.description;

    packageModel.update(name, price, duration, description, id, (err) => {
      if (err) {
        console.error("error updating package: ", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json({ message: "Updated package successfully!" });
      }
    });
  },

  deletePackage: (req, res) => {
  const packageId = req.params.id; // id of the package that is going to be deleted

  packageModel.delete(packageId, (err) => {
    if(err){
      console.error("error deleting the package: ", err.message);
      return res.status(500).json({error: err.message});
    } else {
      res.status(200).json({message: "deleted package successfully"});
    }
  });
  
}
};

module.exports = packageController;
