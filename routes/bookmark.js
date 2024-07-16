const router = require("express").Router();
const bookmarkController = require("../controllers/bookmarkController");
const { verifyAndAuthorization } = require("../middleware/verifyToken");


// CREATE BOOKMARKS
router.post("/", verifyAndAuthorization, bookmarkController.createBookmark);


// DELETE BOOKMARKS

router.delete("/:id", bookmarkController.deleteBookmark);


// GET BOOKMARKS
router.get("/",verifyAndAuthorization, bookmarkController.getBookmarks);



module.exports = router;