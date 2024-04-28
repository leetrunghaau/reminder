const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/account-controller');
const {  authorization } = require('../middlewares/auth-middleware');

// Define routes
router.get("/account", authorization() ,AccountController.getAccount); 
router.put("/account",authorization() , AccountController.updateAccount); 
router.delete("/account",authorization() , AccountController.deleteAccount); 
module.exports = router;
