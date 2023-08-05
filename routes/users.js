const router = require("express").Router();

const {getUserById,search,deleteuser,updateuser, updatepassword} = require("../controllers/users");
const { logout} = require("../controllers/auth")


router.post("/search", search);
router.get("/logout", logout);
router.get("/:id", getUserById);


router.put("/:id", updateuser);
router.post("/authupdate" , updatepassword);
router.delete("/:id" , deleteuser);



module.exports = router;
