const Pets = require("../controllers/pet.controller")
const { authenticate } = require("../config/jwt");

module.exports =(app)=>{
    app.get("/api/dashboard/pets",Pets.findAllPet)
    app.get("/api/pets/:id",Pets.findOneSinglePet)
    app.post("/api/pets/add",Pets.createPet)
    app.patch("/api/pets/:id/update",Pets.updatePet)
    app.delete("/api/pets/:id/delete",Pets.deleteAnExistingPet)
}