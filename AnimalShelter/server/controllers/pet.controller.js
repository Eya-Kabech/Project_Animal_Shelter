const Pet = require("../models/model.pet")

module.exports.findAllPet = (req,res) =>{
    Pet.find()
    .then((AllPets) =>{
        console.log("these are all my pets", AllPets);
        res.json(AllPets)
    })
    .catch((err) =>{
        res.status(400).json(err);
    })
};

module.exports.findOneSinglePet = (req,res) =>{
    Pet.findOne({_id:req.params.id})
    .then((oneSinglePet) =>{
        res.json(oneSinglePet);
    })
    .catch((err) => (
        res.status(400).json(err)
    ))
};

module.exports.createPet = (req,res) =>{
    Pet.create(req.body)
    .then((createdPet) =>{
        res.json({user:createdPet})
    })
    .catch((err)=>{
        res.status(400).json(err)
    })
};

module.exports.updatePet = (req,res) =>{
    Pet.findOneAndUpdate({_id: req.params.id}, req.body,{
        new:true,
        runValidators: true,
    })
    .then((updatedPet)=>{
        res.json({Pet:updatedPet})
    })
    .catch((err)=>{
        res.status(400).json(err)
    })
};

module.exports.deleteAnExistingPet = (req,res) =>{
    Pet.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.json({ result: result });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


