const express = require("express");
const morgan = require("morgan");
const { json } = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.routes");
const reservaRouter = require("./routes/reserva.routes");

const app = express();
const port = process.env.PORT ?? 3001;

app.use(morgan("dev"));
app.use(cors());
app.use(json());

app.use((req, res, next) => {
  console.log('Solicitud recibida:');
  console.log('Método:', req.method);
  console.log('Ruta:', req.url);
  console.log('Cuerpo:', req);
  next();
});


app.use(authRouter);
app.use(reservaRouter);

app.get("/", (req, res) => {
  res.send("Get en raiz");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port} (⌐■_■)`);
});
