const express = require("express");
const router = express.Router();
const pictureCtrl = require("../controllers/picture");

router.post("/post/", pictureCtrl.create);
router.get("/getall/", pictureCtrl.getAll);
router.get("/getone/", pictureCtrl.getOne);
router.put("/modify/:id",pictureCtrl.modifyOne);
router.delete("/delete/:id", pictureCtrl.deleteOne);


module.exports = router;