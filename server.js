const express = require('express')
const app = express()
const port = 3001




app.get('/', (req, res) => {
  res.send('Soy un get de la raiz')
})

app.listen(port, () => {
  console.log(`Hola chiki baby ${port}`)
})