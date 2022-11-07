const express = require('express')
const userRouter = require('./userAPI')
const taskRouter = require('./taskAPI')
const PORT = 8002

/**
 * API Gateway app
 */
app = express()
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.listen(PORT, () => console.log(`\n[*] Server running on port ${PORT}\n`))