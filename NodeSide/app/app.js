const express = require('express')
const bodyParser = require('body-parser')
//const router = require('./routers/router')
const db = require('./config/db')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(router)

const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Simple API Gateway")
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))