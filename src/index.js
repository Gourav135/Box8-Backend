const express = require("express");

// express app
const app = express();

// connect to db
const connect_db = require("./configs/db");
connect_db();

// global middleware
app.use(express.json());

// importing controllers
const userController = require("./controllers/user.controller");
const registerController = require("./controllers/register.controller");
const loginController = require("./controllers/login.controller");
const cartController = require("./controllers/cart.controller");


// directing to respective router
app.use("/users", userController);
app.use("/register", registerController);
app.use("/login", loginController);
app.use("/carts", cartController);







// listen to port 
app.listen(3010);