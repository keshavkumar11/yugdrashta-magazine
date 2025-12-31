const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected");
        
    }catch(error){
        console.error("mongodb connectin failed");
        process.exit(1);
    }
}

module.exports = connectDB;
