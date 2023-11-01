const express = require("express")
require("dotenv").config()
const connectDB = require("./config/db")
const apiRouter = require("./routes")
const cors = require("cors")


const app = express()
connectDB()

app.use(express.json())
app.use(cors())
app.use("/api", apiRouter)


const PORT = 4000 || process.env.PORT


app.get("/", (req, res) => {
    res.send("server was started")
})

app.listen(PORT, () => {
    console.log(`server is up and running on ${PORT} PORT`)
})