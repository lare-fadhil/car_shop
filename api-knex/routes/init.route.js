
const express = require('express')
const app = express()
const Controller = require('../controllers/init.controller')

app.get('/:uid', Controller.init())


module.exports = app 
        