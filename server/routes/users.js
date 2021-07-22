const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController')
const excelControllers = require('../controllers/excelControllers')
const upload = require('../controllers/multer')

router.use(express.json());

router.post('/create', usersController.userCreate)
router.post('/upload', upload.single("file"), excelControllers.upload);

module.exports = router;    