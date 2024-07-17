const router = require("express").Router();
const { verifyAndAuthorization, verifyToken } = require("../middleware/verifyToken");

const chatController = require("../controllers/chatController")

// Create chat
router.post("/", verifyAndAuthorization, chatController.accessChat);


// get chats
router.get("/", verifyAndAuthorization, chatController.getChat);



module.exports = router;