const express = require('express');
const { Server: SocketServer } = require('socket.io')
const { Server: HttpServer } = require('http')

const app = express();
const httpServer = new HttpServer(app)
const io = new SocketServer(httpServer)

const Contenedor = require("./Contenedor");
const miContenedor = new Contenedor("./data/productos.json");

const productosRouter = require("./routers/productos");

const PORT = 8080;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('/public'));

io.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado!')

  socket.emit('products', await miContenedor.getAll())
  
  socket.on('new-product', async (product) => {
    await miContenedor.save(product)
    const products = await miContenedor.getAll()

    // notificara a todos los sockets conectados con el io.sockets.emit
    io.sockets.emit('products', products)
  })
})
app.use("/api/productos", productosRouter);


app.get('/', (req,res) => {
  res.render('pages/form')
}) 
app.post('/nuevoitem', async (req,res) => {
  await miContenedor.save(req.body)
  res.redirect('productos')
} )
app.get("/productos", async (req, res) => {
  const listaDeProductos = await miContenedor.getAll();
  res.render("pages/products", {
    productos: listaDeProductos,
  });
});


const server = httpServer.listen(PORT, () => 
    console.log(`Servidor abierto en http://localhost:${PORT}/`)
)


server.on("error", (error) => console.log("Error:  ", error));
