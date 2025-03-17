const express = require('express')
const app = express()
require('dotenv').config()
const registerRoutes = require('./routes/register.js')
const contactRoutes = require('./routes/contact.js')

const dbConnect = require('./config/database')

const PORT = process.env.PORT || 3000
dbConnect()
app.use(express.json())


app.use("/api/v1/user", registerRoutes);
app.use("/api/v1/contact", contactRoutes);


app.get('/', (req, res) => {
    res.send('Hello World')
})


app.listen(PORT, () => {
    console.log('Server is running on port 4000')
})