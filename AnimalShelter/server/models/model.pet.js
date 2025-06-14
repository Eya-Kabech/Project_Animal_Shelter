const mongoose =  require("mongoose");
const petSchema = new mongoose.Schema({
    name :{
        type:String,
        required: [true, "{PATH} is required"]
    },
    age:{
        type:Number,
        required:[true,"{PATH} is required "]
    },
    breed:{
        type:String,
        required:[true,"{PATH} is required "]
    },
    habit:{
        type:String,
        required:[true,"{PATH} is required "]
    },
    description:{
        type:String,
        required:[true,"{PATH} is required "]
    },
    image:{
        type:String,
    }
},{timestamps : true})

module.exports = mongoose.model("Pet",petSchema);