const router = require("express").Router();
const { verifyToken, verifyAndAuthorization, verifyAndAdmin } = require("../middleware/verifyToken");
const userController = require("../controllers/userController");


// update user 
router.put("/", verifyAndAuthorization, userController.updateUser);
router.delete("/", verifyAndAuthorization, userController.deleteUser);
router.get("/", verifyAndAuthorization, userController.getUser);
router.get("/", verifyAndAdmin, userController.getAllUser);





module.exports = router;