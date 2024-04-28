const express = require('express');
const router = express.Router();
const LableController = require('../controllers/lable-controller');
const {  authorization } = require('../middlewares/auth-middleware');

// Define routes
router.get("/lables", authorization() ,LableController.getAllLable); 
router.post("/lable", authorization() ,LableController.createLable); 
router.put("/lable",authorization() , LableController.updateLable); 
router.delete("/lable/:id",authorization() , LableController.deleteLable); 
module.exports = router;
