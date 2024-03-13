const express = require("express")
const app = express()
const port = 3001

app.get("/", (req, res) => {
  res.send("Get en raiz")
})

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`)
})