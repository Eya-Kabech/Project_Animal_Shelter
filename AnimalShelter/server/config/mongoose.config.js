const mongoose = require("mongoose");
const dbName = "animal_shelter";

// Use localhost instead of 0.0.0.0 in the connection string
mongoose.connect(`mongodb://0.0.0.0:27017/${dbName}` )
  .then(() => console.log(`Connected to ${dbName} database!`))
  .catch((err) => console.log(err));                
                           
