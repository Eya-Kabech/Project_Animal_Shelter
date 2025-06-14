const express = require("express"); 
const app = express();  
const cors = require("cors");
const cookies = require("cookie-parser");

require('dotenv').config();
require("./config/mongoose.config");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies())

app.use(cors({
    credentials: true, origin:"http://localhost:3000"
}));

// Add route
require("../server/routes/users")(app)
require("../server/routes/pets")(app)
require("../server/routes/reports")(app)
require("../server/routes/products")(app)

const server = app.listen(8000, ()=>console.log("Listening on Port 8000"))             
//socket.io
const io = require("socket.io")(server,{cors:true})

io.on('connection',socket =>{
    console.log(socket.id)
})
 

