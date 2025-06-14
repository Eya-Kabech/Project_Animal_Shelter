const mongoose = require ("mongoose")
const ReportSchema = new mongoose.Schema({
    location:{
        type:String,
        required:[true,"{PATH} is required"]
    },
    injury:{
        type:String,
        required:[true,"{PATH} is required "]
    },
    image:{
        type:String,
    }
},{timestamps:true})
module.exports = mongoose.model("Report", ReportSchema);