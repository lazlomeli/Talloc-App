const express = require('express')
const usersRouter = require('./routers/user')
const db = require('./config/db')
const app = express()
const PORT = 3000;

db.connectToDB()
app.use(express.json())
app.use('/users', usersRouter)

app.listen(PORT, () => console.log(`\n[*] Server running on port ${PORT}\n`))