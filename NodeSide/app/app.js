const express = require('express')
const usersRouter = require('./routers/user')
const cookieparser = require('cookie-parser');
const db = require('./config/db')
const app = express()
const PORT = 3000;

db.connectToDB()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(usersRouter)

app.listen(PORT, () => console.log(`\n[*] Server running on port ${PORT}\n`))