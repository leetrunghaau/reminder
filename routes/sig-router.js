const express = require('express');
const router = express.Router();
const SigController = require('../controllers/sig-controller');
const {  authorization } = require('../middlewares/auth-middleware');

// Define routes
router.post("/login", SigController.login); 
router.post("/changePassword",authorization() , SigController.changePassword); 
router.post("/register", SigController.sigup); 
module.exports = router;
