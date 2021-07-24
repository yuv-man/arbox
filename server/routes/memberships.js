const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController')

router.use(express.json());

router.get('/', usersController.getMemberships)
router.post('/create', usersController.membershipCreate)

module.exports = router;    