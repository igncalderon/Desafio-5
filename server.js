// const http = require("http");

// const server = http.createServer((solicitud, respuesta) => {
//   const hour = new Date().getHours();
//   if (hour > 6 && hour <= 12) {
//     respuesta.end("Buenos dias");
//   } else if (hour > 13 && hour <= 19) {
//     respuesta.end("Buenas tardes");
//   } else {
//     respuesta.end("Buenas noches");
//   }
// });

// const serverConnected = server.listen(8080, () => {
//   console.log(
//     "server corriendo en el puerto " + serverConnected.address().port
//   );
// });

const express = require("express");
const app = express();
const Contenedor = require("./Contenedor");
const miContenedor = new Contenedor("productos.json");

const PORT = 8080;

app.get("/", (req, res, next) => {
  res.send("<h1>Bienvenidos al servidores express</h1>");
});

obtenerRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
app.get("/productos", async (req, res) => {
  const listaDeProductos = await miContenedor.getAll();
  res.send({ message: listaDeProductos });
});

app.get("/productoRandom", async (req, res) => {
  const listaDeProductos = await miContenedor.getAll();
  const indiceAleatorio = obtenerRandom(0, listaDeProductos.length);
  res.send({ message: listaDeProductos[indiceAleatorio] });
});

app.listen(PORT, () => {
  console.log("Server corriendo en puerto: ", PORT);
});

app.on("error", (error) => console.log("Error: ", error));
