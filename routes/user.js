const router = require("express").Router();
const { verifyToken, verifyAndAuthorization, verifyAndAdmin } = require("../middleware/verifyToken");
const userController = require("../controllers/userController");


// update user 
router.put("/:id", verifyAndAuthorization, userController.updateUser);
router.delete("/:id", verifyAndAuthorization, userController.deleteUser);
router.get("/:id", verifyAndAuthorization, userController.getUser);
router.get("/", verifyAndAdmin, userController.getAllUser);





module.exports = router;