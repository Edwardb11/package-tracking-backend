const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const conexion = require('./database/db')

const app = express()
const port = 3000



//para procesar datos enviados desde forms
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//seteamos las variables de entorno
dotenv.config({path: './env/.env'})

//para poder trabajar con las cookies
app.use(cookieParser())

//llamar al router
app.use('/', require('./routes/router'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  

})
