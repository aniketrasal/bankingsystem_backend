const express = require("express");
const router = express.Router();
// Imported middleware
const bankManagerVerification = require("../middlewares/banker.middleware");

//Imported controllers
const customersController = require("../controllers/banker/customers.controller");
const customerTransactionController = require("../controllers/banker/customerTransactions.controller");


// Middleware
router.use(bankManagerVerification);

// User api
router.get("/customers", customersController);
router.get("/customerTransactions/:id", customerTransactionController);

module.exports = router;
