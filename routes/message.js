const router = require("express").Router();
const { verifyAndAuthorization, verifyToken } = require("../middleware/verifyToken");

const messageController=require("../controllers/messageController")

// Send Messages
router.post("/", verifyAndAuthorization, messageController.sendMessage);


// get all message
router.get("/:id",verifyAndAuthorization, messageController.getAllMessage);



module.exports = router;