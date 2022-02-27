const mongoose = require("mongoose");

const dbURI = "mongodb+srv://dk-jaiswal-77:Admin123@nodetuts.xzsov.mongodb.net/Box8?retryWrites=true&w=majority";

module.exports = async () => {
    try{
        await mongoose.connect(dbURI);
        console.log("connected to db!");
    }catch(error){
        console.log(error.message);
    }
}