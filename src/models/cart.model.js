const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    mealId : {type : String, required : true},
    mealThumb : {type : String, required : true},
    mealCategory : {type : String, required : true},
    meal : {type : String, required : true},
    mealPrice : {type : String, required : true},
    mealArea : {type : String, required : true},
    mealQty : {type : String, required : true}, 
    userId : {type : mongoose.Schema.Types.ObjectId, ref : "user", required : true}
}, {versionKey : false, timestamps : true}); 

module.exports = mongoose.model("cart", cartSchema);