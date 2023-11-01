const mongoose = require("mongoose")


const url = process.env.MONGODB_URL

mongoose.set("strictQuery", false)

const connectDB = async () => {
    try {
        const connectDB = await mongoose.connect(url)
        console.log(`MONGODB is connected ${connectDB.connection.host}`)
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB