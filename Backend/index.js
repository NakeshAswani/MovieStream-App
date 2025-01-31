const express = require("express")
const cors = require("cors")
const dotenv = require('dotenv')
const route = require('./App/route')

const app = express()

dotenv.config()

app.use(express.json())
app.use(cors())
app.use(route)

app.listen(process.env.HOST, () => {
    console.log(`Server is running on port ${process.env.HOST}`)
})