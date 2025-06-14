const Report = require("../models/model.report")
const User = require("../models/model.user") 


module.exports.findAllReport = (req, res) => {
    Report.find()
      .then((AllReport) => {
        console.log(">>>>>>this is All the reports", AllReport);
        res.json(AllReport);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };

  module.exports.createNewReport = (req, res) => {
    Report.create(req.body)
      .then((newlyCreatedReport) => {
        res.json({ user: newlyCreatedReport });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };
  module.exports.deleteAnExistingReport = (req,res) =>{
    Report.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.json({ result: result });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};