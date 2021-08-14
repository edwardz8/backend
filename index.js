const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors')
const dotenv = require('dotenv')
const mongo = require('mongoose')

/* postgres db */
const Pool = require("pg").Pool;

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});
module.exports = pool;

// dotenv requires to be placed above all code
dotenv.config()

// Models
const User = require('./models/user')
// const Product = require('./models/product')
// const Category = require('./models/category')

const app = express()

// mongodb connection established
mongo.connect(
    process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
        if (err) {
            console.log(err)
        } else {
            console.log('Connected to mongo database using mongoose.')
        }
    }
    ) 


app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// ROUTES 
const productRoutes = require('./routes/product')
const categoryRoutes = require('./routes/category')
const ownerRoutes = require('./routes/owners')
const userRoutes = require('./routes/auth')

app.use('/api', productRoutes)
app.use('/api', categoryRoutes)
app.use('/api', ownerRoutes)
app.use('/api', userRoutes)

// index path
app.get('/', (req, res) => {
    res.json('hello rosterbox backend')
})

// post - index path
app.post('/', (req, res) => {
    console.log(req.body)
    let user = new User()
    user.name = req.body.name 
    user.email = req.body.email 
    user.password = req.body.password 

    user.save((err) => {
        if (err) {
            console.log('new user saved')
            res.json(err)
        } else {
            res.json('new user saved')
        }
    })
})

// server listener
app.listen(8000, err => {
    if (err) {
        console.log(err, 'error on server index file')
    } else {
        console.log('listening on port', 8000)
    }
})