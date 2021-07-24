const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController')
const excelControllers = require('../controllers/excelControllers')
const upload = require('../controllers/multer')

router.use(express.json());

router.get('/', usersController.getUsers);
router.post('/createUser', usersController.userCreate)
router.post('/createUserWithMembership', usersController.userCreateWithMembership)
router.post('/upload', upload.single("file"), excelControllers.upload);

module.exports = router;    