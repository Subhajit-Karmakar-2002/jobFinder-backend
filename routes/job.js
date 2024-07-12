const router = require("express").Router();
const { verifyToken, verifyAndAuthorization, verifyAndAdmin } = require("../middleware/verifyToken");
const jobController = require("../controllers/jobController");



router.post("/", verifyAndAdmin, jobController.createJob);

router.put("/:id", verifyAndAdmin, jobController.updateJob);
router.delete("/:id", verifyAndAdmin, jobController.deleteJob);
router.get("/:id", verifyAndAdmin,jobController.getJob);
router.get("/", verifyAndAdmin, jobController.getAllJob);





module.exports = router;