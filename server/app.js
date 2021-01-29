const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const passport = require('passport')
const PORT = 5000
//connecting to mongodb
app.use(cors())
const {MONGOURI} = require('./keys')
mongoose.connect(MONGOURI, { useFindAndModify: false })
mongoose.connection.on('connected', () => {
    console.log('DATABASE CONNECTED !!!')
})
mongoose.connection.on('error', (err) => {
    console.log(`Error in connection - ${err}`)
})
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyparser.json())
app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }));
require('./models/User')
require('./models/Product')
require('./models/Payments')
require('./models/Reports')
app.use(require('./routes/auth'))
app.use(require('./routes/add_products'))
app.use(require('./routes/stripe'))
app.use(require('./routes/report'))


app.listen(PORT , () => console.log(`Server Running on port number ${PORT}`))