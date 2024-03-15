const express = require("express");
const morgan = require("morgan");
const { json } = require("express");
const authRouter = require("./routes/auth.routes");

const app = express();
const port = process.env.PORT ?? 3001;

app.use(morgan("dev"));
app.use(json());

app.use(authRouter);

app.get("/", (req, res) => {
  res.send("Get en raiz");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port} (⌐■_■)`);
});
