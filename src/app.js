const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://userfinal:BXdGv43yjjfRUO1k@cluster0.ziiwzun.mongodb.net/?retryWrites=true&w=majority')

app.use(express.urlencoded({
    extended: true
}))

//registro da model
require('./models/medicos')
require('./models/tutores')
require('./models/animais')
require('./models/agendamento')

//rotas
const medicosRouter = require('./routers/medicos-route')
const tutoresRouter = require('./routers/tutores-route')
const animaisRouter = require('./routers/animais-route')
const agendamentosRouter = require('./routers/agendamentos-route')
const index = require('./routers/index')

app.use('/', index)
app.use('/medico', medicosRouter)
app.use('/tutores', tutoresRouter)
app.use('/animais', animaisRouter)
app.use('/agendamentos', agendamentosRouter)

module.exports = app;