const express = require('express')
const router = require('./router')
const PORT = 8002

/**
 * API Gateway app
 */
app = express()
app.use(router)
app.listen(PORT, () => console.log(`\n[*] Server running on port ${PORT}\n`))

module.exports = PORT