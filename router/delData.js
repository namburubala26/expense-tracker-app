const express = require('express')
const router = express.Router()
const delController = require('../controllers/delData')

router.delete('/delData/:id',delController.delData)
module.exports = router