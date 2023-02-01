const express = require('express')
const router = express.Router()
const formController = require('../controllers/getData')

router.get('/getData',formController.getData)
module.exports = router