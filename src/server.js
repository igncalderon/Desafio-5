const express = require('express');
const { Server: SocketServer } = require('socket.io')
const { Server: HttpServer } = require('http')

const app = express();
const httpServer = new HttpServer(app)
const io = new SocketServer(httpServer)

const { getMessages, saveMessage } = require('../data/messages')

const ContainerProducts = require("../Contenedor");
const miContenedor = new ContainerProducts("./data/productos.json");

const productosRouter = require("./routers/productos");
const cartRouter = require('./routers/carts');

const PORT = 8080;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../public'));

io.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado!')

  socket.emit('products', await miContenedor.getAll())
  socket.emit('messages', getMessages())

  socket.on('new-message', (message) => {
    saveMessage({message})
    const messages = getMessages()

    io.socket.emit('messages', messages)
  })
  
  socket.on('new-product', async (product) => {
    await miContenedor.save(product)
    const products = await miContenedor.getAll()

    // notificara a todos los sockets conectados con el io.sockets.emit
    io.sockets.emit('products', products)
  })
})

app.use("/api/productos", productosRouter);
app.use("/api/carrito", cartRouter)

app.get('/', async (req,res) => {
  res.render('../views/pages/form')
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
