//import the mongoose lib to build the schema
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    firstName :{
        type:String,
        required: [true, "first name is required"]
    },
    lastName:{
        type:String,
        required: [true, "last name is required"],
    },
    email:{
        type:String,
        required: [true, "{PATH} is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
          }    
    },
    password :{
        type:String,
        required: [true, "password is required"],
        minLength :[8,"password must have at least 8 characters"]
    },
    role:{
        type:String,
        required: [true, "{PATH} is required"],
        enum: {
            values:["member", "guest","role must be either member or guest"],
            message:"{VALUE} is not a valid role. Please choose either 'member' or 'guest'"
        },
    }}, {timestamps : true});

    userSchema.methods.generateAuthToken = function (){
        const token = jwt.sign({_id:this._id}, process.env.JWTPRIVATEKEY)
        return token 

    };

    userSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );


    userSchema.pre('validate', function(next) {
        if (this.password !== this.confirmPassword) {
          this.invalidate('confirmPassword', 'Password must match confirm password');
        }
        next();
      });
      
      userSchema.pre("save", function(next){
        bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err =>{
            console.log("HASHING PASSWORD DIDNT WORK",err)
            next()
        })
      });
      

    module.exports = mongoose.model("User",userSchema);
    
