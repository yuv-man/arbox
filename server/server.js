const express = require('express')
const app = express()
const router = express.Router();
const PORT = 5000
const mysql = require('mysql')
const cors = require('cors')
const users = require('./routes/users')
const memberships = require('./routes/memberships')

//middlewares
app.use(express.json());
app.use(cors())

app.use('/users', users)
app.use('/memberships', memberships)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})