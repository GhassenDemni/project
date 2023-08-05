const router = require("express").Router()

const {comntposte , updatecomment , deletecomment} = require('../controllers/comment')

router.patch("/comment/:id", comntposte),
  router.patch("/updatecomnt/:id", updatecomment),
  router.patch("/deletcommnt/:id", deletecomment);

module.exports = router;