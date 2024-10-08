
const connectToMongo =require('./db')
const express = require('express')
const cors=require('cors')

connectToMongo();

const app = express()
const port = 5000

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`e-Notebook listening on port http://localhost:${port}/`)
})