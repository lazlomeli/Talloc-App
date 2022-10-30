const express = require('express')
const usersRouter = require('./routers/user')
const mongoose = require('mongoose')
const app = express()
const PORT = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/pstudioDB', { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', (error) => console.error('\n[*] Error connecting to the database\n', error))

db.once('open', () => console.log("[*] Connected to Database\n"))

app.use(express.json())
app.use('/users', usersRouter)

app.listen(PORT, () => console.log(`\n[*] Server running on port ${PORT}\n`))