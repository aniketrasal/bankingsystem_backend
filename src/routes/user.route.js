const express = require("express");
const router = express.Router();
// Imported middleware
const userVerification = require("../middlewares/auth.middleware");

//Imported controllers
const userController = require("../controllers/user/accout.controller");
const depositController  = require("../controllers/user/deposite.controller");
const transactionController = require("../controllers/user/withdraw.controller");
const withdrawController= require("../controllers/user/transactions.controller");

// Middleware
router.use(userVerification);

// account route
router.get("/account", userController);
//deposit route
router.post("/deposit", depositController);
//transiction route
router.get("/transactions", transactionController);
//withdraw route
router.post("/withdraw", withdrawController);

module.exports = router;
