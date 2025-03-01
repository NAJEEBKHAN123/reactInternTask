const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config();
const DBconnection = require('./db')
const ItemRoutes = require('./routes/ItemRoute')
const cors = require('cors')

 //db connection
DBconnection();

//middleware
app.use(cors())
app.use(express.json())
const PORT = 3000


app.get('/', (req, res) =>{
    res.send("this is home page")
})

app.use('/api', ItemRoutes)

app.listen(PORT, () =>{
    console.log(`Server is listening on http://localhost:${PORT}`)
})