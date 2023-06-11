const router = require("express").Router();
const {
  getAllJob,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/job");

router.get("/:id", getJob);
router.get("/", getAllJob);
router.post("/", createJob);
router.patch("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;
