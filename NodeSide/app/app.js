const express = require('express')
const usersRouter = require('./routers/user')
const cookieparser = require('cookie-parser');
const db = require('./config/db')
const app = express()
const PORT = 3000;

const cors = require('cors')
const whiteList = ['http://localhost:5173']

db.connectToDB()

app.use(cors({ origin: whiteList }))

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(usersRouter)


app.listen(PORT, () => console.log(`\n🚀 Server running on port ${PORT}\n`))