const Reports = require("../controllers/report.controller")

module.exports = (app) =>{
    app.get("/api/report",Reports.findAllReport)
    app.post("/api/report",Reports.createNewReport)
    app.delete("/api/report/:id/delete",Reports.deleteAnExistingReport)
}