const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { upload } = require("../controllers/upimage");
const {
  createpost,
  readpost,
  updateposte,
  deletepost,
  likeposte,
  nolikeposte,
} = require("../controllers/posts");


router.get("/getpost", readpost);
router.post("/createpost", upload.single("image"), createpost);
router.put("/:id", updateposte);
router.delete("/:id", deletepost);
router.patch("/like/:id",likeposte)
router.patch("/dislike/:id", nolikeposte);


module.exports = router;