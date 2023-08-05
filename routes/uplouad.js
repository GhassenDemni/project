const router = require("express").Router();
const { upload, uploadprofile } = require("../controllers/upimage");

// Route pour télécharger l'image
router.post("/image", upload.single("image"), uploadprofile);

module.exports = router;



// router.post('/', upload.single("image"), (req, res) => {
//     res.status(200).json("image uplouad avec succées")
// })
