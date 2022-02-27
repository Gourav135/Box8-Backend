const express = require("express");

// router 
const router = express.Router();

// importing Cart model
const Cart = require("../models/cart.model");

// CRUD operations ------------------------------------------------------->
// POST request  // adding item to carts collection
router.post("", async(req, res) => {
    try{
        await Cart.create(req.body);
        return res.send("item added to cart!");

    }catch(error){
        console.log(error.message);
    }
});

// GET request  // for getting all the cart items of an user
router.get("/user/:userId", async(req, res) => {
    try{

        const carts = await Cart.find({userId : req.params.userId}).lean().exec();
        // console.log(carts);
        res.send(carts);

    }catch(error){
        console.log(error.message);
    }
});

// GET request // to check the item is already added to cart or not

router.get("/meal/:mealId", async(req, res) => {
    try{
        const cart = await Cart.findOne({mealId : req.params.mealId}).lean().exec();
        res.send(cart); // null or cart_object 

    }catch(error){
        console.log(error);
    }
});

// DELETE request // to delete single cart item
router.delete("/:mealId", async (req, res) => {
    try{
        const cart = await Cart.deleteOne({mealId : req.params.mealId});
        res.send({msg : "item deleted from cart!"});
        

    }catch(error){
        console.log(error.message);
    }
});

//DELETE request // to delete all the cart items of user
router.delete("/user/:userId", async (req, res) => {
    try{
        await Cart.deleteMany({userId : req.params.userId});
        res.send("Deleted")
    }
    catch(error){
        console.log(error.message);
    }
})

// exporting router
module.exports = router;