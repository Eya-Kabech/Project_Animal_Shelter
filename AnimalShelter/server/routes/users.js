const { authenticate } = require("../config/jwt");
const Users = require("../controllers/user.controller");


module.exports = app=>{
    app.post("/api/register",Users.register)
    app.post("/api/login",Users.login)
    app.get("/api/dashboard",authenticate,Users.getLoggedInUser)
    app.get("/api/logout",Users.logout)
}