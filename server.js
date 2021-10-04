const express = require("express");
const app = express();

const Contenedor = require("./Contenedor");
const miContenedor = new Contenedor("./data/productos.json");

const productosRouter = require("./routers/productos");

const PORT = 8080;

// middlewares de express que permite usar el req.body
// setear el formate de los parametros que voy a recibir en json
// json extendidos, no solo texto, sino numeros
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.send("<h1>Bienvenidos al servidores express</h1>");
});

obtenerRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
/* LO PASO AL ROUTERS DE PRODUCTOS
app.get("/productos", async (req, res) => {
  const listaDeProductos = await miContenedor.getAll();
  res.send({ message: listaDeProductos });
});
 */
app.use("/api/productos", productosRouter);

app.get("/productoRandom", async (req, res) => {
  const listaDeProductos = await miContenedor.getAll();
  const indiceAleatorio = obtenerRandom(0, listaDeProductos.length);
  res.send({ message: listaDeProductos[indiceAleatorio] });
});

app.listen(PORT, () => {
  console.log("Server corriendo en puerto: ", PORT);
});

app.on("error", (error) => console.log("Error: ", error));
