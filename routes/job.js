const router = require("express").Router();
const { verifyToken, verifyAndAuthorization, verifyAndAdmin } = require("../middleware/verifyToken");
const jobController = require("../controllers/jobController");



router.post("/", verifyAndAdmin, jobController.createJob);

router.put("/:id", verifyAndAdmin, jobController.updateJob);

router.delete("/:id", verifyAndAdmin, jobController.deleteJob);

router.get("/:id", jobController.getJob);

router.get("/agent/:id", jobController.getAllJobofAgent);

router.get("/", jobController.getAllJob);

router.get("/search/:key", jobController.searchJob);





module.exports = router;