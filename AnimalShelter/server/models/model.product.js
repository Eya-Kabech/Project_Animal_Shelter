const mongoose = require("mongoose")
const ProductSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required : [true,"{PATH} is required"]
        },
        price:{
            type:Number,
            required:[true,"{PATH} is required "]
        },
        image:{
            type:String,
            required:[true,"{PATH} is required"]
        }
    },{timestamps:true}
);

module.exports = mongoose.model("Product", ProductSchema);