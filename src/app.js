const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')

mongoose.connect('mongodb://fiap:123456@localhost:27017/admin')

app.use(express.urlencoded({
    extended: true
}))

//registro da model
require('./models/medicos')
require('./models/tutores')
require('./models/animais')

//rotas
const medicosRouter = require('./routers/medicos-route')
const tutoresRouter = require('./routers/tutores-route')
const animaisRouter = require('./routers/animais-route')
const index = require('./routers/index')

app.use('/', index)
app.use('/medicos', medicosRouter)
app.use('/tutores', tutoresRouter)
app.use('/animais', animaisRouter)



module.exports = app;