const express = require("express");
const bcrypt = require("bcrypt");

// router
const router = express.Router();

// importing User model
const User = require("../models/user.model");

// CRUD operations ------------------------------------------>
// POST request // logging in user
router.post("", async(req, res) => {
    try{
        // checking entered email exists in db or not
        const user = await User.findOne({email : req.body.email}).lean().exec();
        if(user == null)
        {
            // email does not exist
            return res.send({status : false, error : "user does not exist!"});
        }

        // email exists // then checking password is matching or not
        const match_password = await bcrypt.compare(req.body.password, user.password);

        if(match_password)
        {
            // password matched
            return res.send({status : true, userId : user["_id"]});
        }

        // password did not match
        return res.send({status : false, error : "invalid email or password!"});

    }catch(error){

    }
});

// exporting router
module.exports = router;