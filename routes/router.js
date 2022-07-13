const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const conexion = require('../database/db')

router.get('/', (req, res) => {
    res.send('Hello World!')
    console.log(conexion())
  })
//router para los métodos del controller
router.post('/register', authController.register)


module.exports = router