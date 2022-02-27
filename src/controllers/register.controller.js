const express = require("express");
const {body, validationResult} = require("express-validator");

// router
const router = express.Router();

// importing User model
const User = require("../models/user.model");

// CRUD operations ---------------------->
// POST request // registering user
router.post(
    "", 
    body("name").notEmpty().withMessage("name cannot be empty!").isString().withMessage("name should be string!").isLength({min : 3, max : 25}).withMessage("name should be between 3 and 25 in length"), 
    body("email").notEmpty().withMessage("email cannot be empty!").isEmail().withMessage("invalid email").custom(async (value) => {
        const user = await User.findOne({email : value}).lean().exec();
        if(user == null)
        {
            return true;
        }
        return false;
    }).withMessage("user alredy exists!"), 
    body("password").isStrongPassword().withMessage("enter strong password!"), 
    async (req, res) => {
    try{
        let errors = validationResult(req);
        if(!errors.isEmpty())
        {
            // validation unsuccessful
            return res.send(errors.array());
        }
        // validation successful
        // register user to db
        await User.create(req.body);
        return res.send(true);

    }catch(error){
        console.log(error.message);
    }
});



// exporting router
module.exports = router;