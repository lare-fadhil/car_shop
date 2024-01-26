
const express = require('express')
require("dotenv").config();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()

const car_items = require('./routes/car_items.route')

const cars = require('./routes/cars.route')

const expenses = require('./routes/expenses.route')

const invoice_items = require('./routes/invoice_items.route')

const invoices = require('./routes/invoices.route')

const items = require('./routes/items.route')

const users = require('./routes/users.route')

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next()
})

app.get('/documentation',(req,res,next)=>{
    res.sendFile('./api-documentation/index.html',{root:__dirname})
})

app.get('/postman.json',(req,res,next)=>{
    res.sendFile('./api-documentation/postman.json',{root:__dirname})
})


app.get('/documentation/car_items',(req,res,next)=>{
    res.sendFile('./api-documentation/car_items.html',{root:__dirname})
})

app.get('/documentation/cars',(req,res,next)=>{
    res.sendFile('./api-documentation/cars.html',{root:__dirname})
})

app.get('/documentation/expenses',(req,res,next)=>{
    res.sendFile('./api-documentation/expenses.html',{root:__dirname})
})

app.get('/documentation/invoice_items',(req,res,next)=>{
    res.sendFile('./api-documentation/invoice_items.html',{root:__dirname})
})

app.get('/documentation/invoices',(req,res,next)=>{
    res.sendFile('./api-documentation/invoices.html',{root:__dirname})
})

app.get('/documentation/items',(req,res,next)=>{
    res.sendFile('./api-documentation/items.html',{root:__dirname})
})

app.get('/documentation/users',(req,res,next)=>{
    res.sendFile('./api-documentation/users.html',{root:__dirname})
})


app.use('/car_items',car_items)
app.use('/cars',cars)
app.use('/expenses',expenses)
app.use('/invoice_items',invoice_items)
app.use('/invoices',invoices)
app.use('/items',items)
app.use('/users',users)

app.use((req,res,next)=>{
    const error = new Error('Route Not Found')
    error.status = 404
    next(error)
})
app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message:error.message
        }
    })
})

const port = process.env.SERVER_PORT || 5000
app.listen(port,()=>{
    console.log('listening on port : '+port)
    console.log('visit /documentation to see full api documentation')
})
        