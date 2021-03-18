const express = require('express')
//multer
const multer = require('../middlewares/multer.config.js');
//controllers
const testCtrl = require('../controllers/test.js')
//router
const router = express.Router();

router.post('/', multer, testCtrl.test);

module.exports = router;